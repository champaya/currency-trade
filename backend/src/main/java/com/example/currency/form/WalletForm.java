package com.example.currency.form;

import com.example.currency.domain.CurrencyType;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public class WalletForm {

    @NotNull(message = "通貨タイプは必須です")
    private CurrencyType currencyType;

    @NotNull(message = "残高は必須です")
    private BigDecimal balance;

    // コンストラクタ、ゲッター、セッター
    public WalletForm() {
    }

    public CurrencyType getCurrencyType() {
        return currencyType;
    }

    public void setCurrencyType(CurrencyType currencyType) {
        this.currencyType = currencyType;
    }

    public BigDecimal getBalance() {
        return balance;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }
}
