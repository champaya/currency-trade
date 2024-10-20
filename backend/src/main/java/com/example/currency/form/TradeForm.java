package com.example.currency.form;

import com.example.currency.domain.TradeType;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public class TradeForm {

    @NotNull(message = "取引タイプは必須です")
    private TradeType tradeType;

    @NotNull(message = "取引額は必須です")
    private BigDecimal amount;

    @NotNull(message = "レートは必須です")
    private BigDecimal rate;

    @NotNull(message = "通貨名は必須です")
    private String localCurrencyName;

    // コンストラクタ、ゲッター、セッター
    public TradeForm() {
    }

    public TradeType getTradeType() {
        return tradeType;
    }

    public void setTradeType(TradeType tradeType) {
        this.tradeType = tradeType;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public BigDecimal getRate() {
        return rate;
    }

    public void setRate(BigDecimal rate) {
        this.rate = rate;
    }

    public String getLocalCurrencyName() {
        return localCurrencyName;
    }

    public void setLocalCurrencyName(String localCurrencyName) {
        this.localCurrencyName = localCurrencyName;
    }
}
