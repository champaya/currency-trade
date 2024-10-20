package com.example.currency.domain;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum TradeStatus {
    OPEN,
    COMPLETED,
    CANCELLED;

    // TODO DBに保存するときに小文字になるため追加した。消したい
    @JsonCreator
    public static TradeStatus forValue(String value) {
        return TradeStatus.valueOf(value.toUpperCase());
    }
}
