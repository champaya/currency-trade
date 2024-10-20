package com.example.currency.controller;

import com.example.currency.domain.TradeHistory;
import com.example.currency.service.TradeHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/trade-history")
public class TradeHistoryController {

    @Autowired
    private TradeHistoryService tradeHistoryService;

    // ユーザーの取引履歴を取得 (GET)
    @GetMapping
    public ResponseEntity<List<TradeHistory>> getTradeHistoryByUserId(@RequestParam Long userId) {
        List<TradeHistory> tradeHistories = tradeHistoryService.getTradeHistoryByUserId(userId);
        return new ResponseEntity<>(tradeHistories, HttpStatus.OK);
    }
}
