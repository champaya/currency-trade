package com.example.currency.domain;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "rates")
public class Rate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long rateId;

    @Column(nullable = false)
    private String numeratorCurrency;

    @Column(nullable = false)
    private String denominatorCurrency;

    @Column(nullable = false)
    private BigDecimal rate;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    // コンストラクタ、ゲッター、セッター
    public Rate() {
        this.createdAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getRateId() {
        return rateId;
    }

    public void setRateId(Long rateId) {
        this.rateId = rateId;
    }

    public String getNumeratorCurrency() {
        return numeratorCurrency;
    }

    public void setNumeratorCurrency(String numeratorCurrency) {
        this.numeratorCurrency = numeratorCurrency;
    }

    public String getDenominatorCurrency() {
        return denominatorCurrency;
    }

    public void setDenominatorCurrency(String denominatorCurrency) {
        this.denominatorCurrency = denominatorCurrency;
    }

    public BigDecimal getRate() {
        return rate;
    }

    public void setRate(BigDecimal rate) {
        this.rate = rate;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
