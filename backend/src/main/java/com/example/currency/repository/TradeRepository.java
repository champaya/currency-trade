package com.example.currency.repository;

import com.example.currency.domain.Trade;
import com.example.currency.domain.TradeStatus;
import com.example.currency.domain.TradeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TradeRepository extends JpaRepository<Trade, Long> {

    List<Trade> findByStatus(TradeStatus status);

    List<Trade> findByUserId(Long userId);

    List<Trade> findByTradeTypeAndStatus(TradeType tradeType, String status);
}
