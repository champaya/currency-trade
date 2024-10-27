package com.example.currency.service;

import com.example.currency.domain.*;
import com.example.currency.repository.TradeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
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

    // 1分ごとにマッチング処理を実行
    @Scheduled(fixedRate = 60000)
    @Transactional
    public void matchTrades() {
        List<Trade> openTrades = tradeRepository.findByStatus(TradeStatus.OPEN);

        for (Trade buyTrade : openTrades) {
            if (buyTrade.getTradeType() != TradeType.BUY ||
                    buyTrade.getStatus() != TradeStatus.OPEN)
                continue;

            for (Trade sellTrade : openTrades) {
                if (sellTrade.getTradeType() != TradeType.SELL ||
                        sellTrade.getStatus() != TradeStatus.OPEN ||
                        sellTrade.getUser().getUserId().equals(buyTrade.getUser().getUserId()))
                    continue;

                // 同じ通貨で、同じ量、かつ売りレートが買いレート以下の場合にマッチング
                if (sellTrade.getLocalCurrencyName().equals(buyTrade.getLocalCurrencyName()) &&
                        sellTrade.getAmount().compareTo(buyTrade.getAmount()) == 0 &&
                        sellTrade.getRate().compareTo(buyTrade.getRate()) <= 0) {

                    // 取引を完了状態に更新
                    completeTrade(buyTrade, sellTrade);

                    // 取引履歴の作成
                    tradeHistoryService.createTradeHistory(buyTrade);
                    tradeHistoryService.createTradeHistory(sellTrade);

                    // ウォレットの更新
                    updateWallets(buyTrade, sellTrade);

                    break; // 一つの取引に対して一度だけマッチング
                }
            }
        }
    }

    private void completeTrade(Trade buyTrade, Trade sellTrade) {
        // 買い注文の更新
        buyTrade.setStatus(TradeStatus.COMPLETED);
        buyTrade.setMatchedTradeId(sellTrade.getTradeId());
        buyTrade.setMatchedRate(sellTrade.getRate());
        buyTrade.setMatchedAt(LocalDateTime.now());
        buyTrade.setCompletedAt(LocalDateTime.now());
        tradeRepository.save(buyTrade);

        // 売り注文の更新
        sellTrade.setStatus(TradeStatus.COMPLETED);
        sellTrade.setMatchedTradeId(buyTrade.getTradeId());
        sellTrade.setMatchedRate(sellTrade.getRate());
        sellTrade.setMatchedAt(LocalDateTime.now());
        sellTrade.setCompletedAt(LocalDateTime.now());
        tradeRepository.save(sellTrade);
    }

    @Autowired
    private WalletService walletService;

    private void updateWallets(Trade buyTrade, Trade sellTrade) {
        // 買い手のウォレット更新
        List<Wallet> buyerWallets = walletService.getWalletsByUserId(buyTrade.getUser().getUserId());
        Wallet buyerCashWallet = buyerWallets.stream()
                .filter(w -> w.getCurrencyType() == CurrencyType.CASH)
                .findFirst()
                .orElseThrow(() -> new RuntimeException("現金ウォレットが見つかりません"));

        Wallet buyerLocalWallet = buyerWallets.stream()
                .filter(w -> w.getCurrencyType() == CurrencyType.LOCAL_CURRENCY &&
                        w.getLocalCurrencyName().equals(buyTrade.getLocalCurrencyName()))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("地域通貨ウォレットが見つかりません"));

        // 売り手のウォレット更新
        List<Wallet> sellerWallets = walletService.getWalletsByUserId(sellTrade.getUser().getUserId());
        Wallet sellerCashWallet = sellerWallets.stream()
                .filter(w -> w.getCurrencyType() == CurrencyType.CASH)
                .findFirst()
                .orElseThrow(() -> new RuntimeException("現金ウォレットが見つかりません"));

        Wallet sellerLocalWallet = sellerWallets.stream()
                .filter(w -> w.getCurrencyType() == CurrencyType.LOCAL_CURRENCY &&
                        w.getLocalCurrencyName().equals(sellTrade.getLocalCurrencyName()))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("地域通貨ウォレットが見つかりません"));

        // 取引金額の計算
        BigDecimal tradeAmount = buyTrade.getAmount().multiply(sellTrade.getRate());

        // 買い手: 現金を減らし、地域通貨を増やす
        buyerCashWallet.setBalance(buyerCashWallet.getBalance().subtract(tradeAmount));
        buyerLocalWallet.setBalance(buyerLocalWallet.getBalance().add(buyTrade.getAmount()));

        // 売り手: 現金を増やし、地域通貨を減らす
        sellerCashWallet.setBalance(sellerCashWallet.getBalance().add(tradeAmount));
        sellerLocalWallet.setBalance(sellerLocalWallet.getBalance().subtract(sellTrade.getAmount()));

        // ウォレットの保存
        walletService.updateWallet(buyerCashWallet.getWalletId(), buyerCashWallet);
        walletService.updateWallet(buyerLocalWallet.getWalletId(), buyerLocalWallet);
        walletService.updateWallet(sellerCashWallet.getWalletId(), sellerCashWallet);
        walletService.updateWallet(sellerLocalWallet.getWalletId(), sellerLocalWallet);
    }
}