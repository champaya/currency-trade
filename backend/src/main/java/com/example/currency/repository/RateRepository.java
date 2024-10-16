package com.example.currency.repository;

import com.example.currency.domain.Rate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RateRepository extends JpaRepository<Rate, Long> {
    Rate findTopByCurrencyPairOrderByCreatedAtDesc(String currencyPair); // 最新のレートを取得
}
