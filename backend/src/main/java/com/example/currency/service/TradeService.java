package com.example.currency.service;

import com.example.currency.domain.*;
import com.example.currency.repository.TradeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TradeService {

    @Autowired
    private TradeRepository tradeRepository;

    @Autowired
    private TradeHistoryService tradeHistoryService;

    // 取引の登録
    public Trade createTrade(User user, Trade tradeDetails) {
        // 登録ロジック
        Trade trade = new Trade();
        trade.setUser(user);
        trade.setTradeType(tradeDetails.getTradeType());
        trade.setAmount(tradeDetails.getAmount());
        trade.setRate(tradeDetails.getRate());
        trade.setLocalCurrencyName(tradeDetails.getLocalCurrencyName());
        trade.setStatus(TradeStatus.OPEN);
        return tradeRepository.save(trade);
    }

    // マッチング処理
    public void matchTrades() {
        List<Trade> openTrades = tradeRepository.findByStatus(TradeStatus.OPEN);

        for (Trade buyTrade : openTrades) {
            if (buyTrade.getTradeType() != TradeType.BUY)
                continue;

            for (Trade sellTrade : openTrades) {
                if (sellTrade.getTradeType() != TradeType.SELL)
                    continue;

                if (buyTrade.getRate().compareTo(sellTrade.getRate()) >= 0) {
                    // マッチング成立
                    buyTrade.setStatus(TradeStatus.COMPLETED);
                    buyTrade.setMatchedTradeId(sellTrade.getTradeId());
                    buyTrade.setMatchedRate(sellTrade.getRate());
                    buyTrade.setMatchedAt(java.time.LocalDateTime.now());
                    buyTrade.setCompletedAt(java.time.LocalDateTime.now());
                    tradeRepository.save(buyTrade);

                    sellTrade.setStatus(TradeStatus.COMPLETED);
                    sellTrade.setMatchedTradeId(buyTrade.getTradeId());
                    sellTrade.setMatchedRate(sellTrade.getRate());
                    sellTrade.setMatchedAt(java.time.LocalDateTime.now());
                    sellTrade.setCompletedAt(java.time.LocalDateTime.now());
                    tradeRepository.save(sellTrade);

                    // ウォレットの更新
                    updateWallets(buyTrade, sellTrade);

                    // 取引履歴の作成
                    tradeHistoryService.createTradeHistory(buyTrade);
                    tradeHistoryService.createTradeHistory(sellTrade);

                    break; // 一つの取引に対して一度だけマッチング
                }
            }
        }
    }

    // ウォレットの更新
    private void updateWallets(Trade buyTrade, Trade sellTrade) {
        // ウォレット更新ロジック
    }

    public List<Trade> getTradesByUserId(Long userId) {
        return tradeRepository.findByUser_UserId(userId);
    }
}
