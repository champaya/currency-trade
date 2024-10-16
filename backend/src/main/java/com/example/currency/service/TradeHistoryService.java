package com.example.currency.service;

import com.example.currency.domain.Trade;
import com.example.currency.domain.TradeHistory;
import com.example.currency.repository.TradeHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TradeHistoryService {

    @Autowired
    private TradeHistoryRepository tradeHistoryRepository;

    // 取引履歴の作成
    public void createTradeHistory(Trade trade) {
        TradeHistory tradeHistory = new TradeHistory(
                trade.getUser(),
                trade,
                trade.getTradeType(),
                trade.getAmount(),
                trade.getRate(),
                trade.getCompletedAt());
        tradeHistoryRepository.save(tradeHistory);
    }

    // ユーザーごとの取引履歴を取得
    public List<TradeHistory> getTradeHistoryByUserId(Long userId) {
        return tradeHistoryRepository.findByUser_UserId(userId);
    }
}
