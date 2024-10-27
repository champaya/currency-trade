package com.example.currency.repository;

import com.example.currency.domain.Rate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RateRepository extends JpaRepository<Rate, Long> {
    Rate findTopByNumeratorCurrencyAndDenominatorCurrencyOrderByCreatedAtDesc(String numeratorCurrency,
            String denominatorCurrency); // 最新のレートを取得

    // 指定された通貨ペアの最新1000件のレートを取得
    List<Rate> findTop1000ByNumeratorCurrencyAndDenominatorCurrencyOrderByCreatedAtAsc(
            String numeratorCurrency,
            String denominatorCurrency);
}
