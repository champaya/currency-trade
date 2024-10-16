package com.example.currency.form;

import jakarta.validation.constraints.NotNull;

public class TradeHistoryForm {

    @NotNull(message = "ユーザーIDは必須です")
    private Long userId;

    // コンストラクタ、ゲッター、セッター
    public TradeHistoryForm() {
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
