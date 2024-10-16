package com.example.currency.websocket;

import java.math.BigDecimal;

public class RateMessage {

    private String currencyPair;
    private BigDecimal rate;

    // コンストラクタ、ゲッター、セッター
    public RateMessage() {
    }

    public RateMessage(String currencyPair, BigDecimal rate) {
        this.currencyPair = currencyPair;
        this.rate = rate;
    }

    public String getCurrencyPair() {
        return currencyPair;
    }

    public void setCurrencyPair(String currencyPair) {
        this.currencyPair = currencyPair;
    }

    public BigDecimal getRate() {
        return rate;
    }

    public void setRate(BigDecimal rate) {
        this.rate = rate;
    }
}
