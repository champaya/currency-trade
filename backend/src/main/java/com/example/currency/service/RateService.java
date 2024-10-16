package com.example.currency.service;

import com.example.currency.domain.Rate;
import com.example.currency.domain.Trade;
import com.example.currency.domain.TradeType;
import com.example.currency.repository.RateRepository;
import com.example.currency.repository.TradeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@Service
public class RateService {

    @Autowired
    private RateRepository rateRepository;

    @Autowired
    private TradeRepository tradeRepository;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    private final BigDecimal INITIAL_RATE = new BigDecimal("1.0"); // 初期レート

    // レートを需要と供給に基づいて決定するロジック
    @Scheduled(fixedRate = 60000) // 1分ごとに実行
    public void updateRateBasedOnTrades() {
        // 1分以内に発生した売買注文を取得する（例: 1分以内に作成された取引）
        List<Trade> buyTrades = tradeRepository.findByTradeTypeAndStatus(TradeType.BUY, "open");
        List<Trade> sellTrades = tradeRepository.findByTradeTypeAndStatus(TradeType.SELL, "open");

        BigDecimal totalBuyAmount = buyTrades.stream()
                .map(Trade::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal totalSellAmount = sellTrades.stream()
                .map(Trade::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal newRate = calculateNewRate(totalBuyAmount, totalSellAmount);

        // レートを更新する
        Rate updatedRate = new Rate();
        updatedRate.setCurrencyPair("LOCAL_CURRENCY/CASH");
        updatedRate.setRate(newRate);
        rateRepository.save(updatedRate);

        // WebSocketでクライアントに配信
        messagingTemplate.convertAndSend("/topic/rates", updatedRate);
    }

    // 需要と供給に基づく新しいレートの計算
    private BigDecimal calculateNewRate(BigDecimal totalBuyAmount, BigDecimal totalSellAmount) {
        // 買いの量が多ければレート上昇、売りが多ければレート下降
        if (totalSellAmount.compareTo(BigDecimal.ZERO) == 0) {
            return INITIAL_RATE; // 売り注文がない場合は初期レート
        }
        return totalBuyAmount.divide(totalSellAmount, 2, RoundingMode.HALF_UP);
    }

    // 最新のレートを取得
    public Rate getLatestRate(String currencyPair) {
        return rateRepository.findTopByCurrencyPairOrderByCreatedAtDesc(currencyPair);
    }
}
