package com.example.currency.websocket;

import java.math.BigDecimal;

public class RateMessage {

    private String numeratorCurrency;
    private String denominatorCurrency;
    private BigDecimal rate;

    // コンストラクタ、ゲッター、セッター
    public RateMessage() {
    }

    public RateMessage(String numeratorCurrency, String denominatorCurrency, BigDecimal rate) {
        this.numeratorCurrency = numeratorCurrency;
        this.denominatorCurrency = denominatorCurrency;
        this.rate = rate;
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
}
