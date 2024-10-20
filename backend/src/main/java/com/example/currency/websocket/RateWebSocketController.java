package com.example.currency.websocket;

import com.example.currency.domain.Rate;
import com.example.currency.service.RateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class RateWebSocketController {

    @Autowired
    private RateService rateService;

    // クライアントからのレートリクエストを処理し、最新のレートを返す
    @MessageMapping("/rate/get") // クライアントは /app/rate/get にメッセージを送信
    @SendTo("/topic/rates") // クライアントは /topic/rates を購読
    public Rate getLatestRate(String numeratorCurrency, String denominatorCurrency) throws Exception {
        return rateService.getLatestRate(numeratorCurrency, denominatorCurrency);
    }
}
