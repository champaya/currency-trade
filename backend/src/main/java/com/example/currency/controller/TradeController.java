package com.example.currency.controller;

import com.example.currency.domain.Trade;
import com.example.currency.domain.User;
import com.example.currency.form.TradeForm;
import com.example.currency.service.TradeService;
import com.example.currency.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/api/trades")
public class TradeController {

    @Autowired
    private TradeService tradeService;

    @Autowired
    private UserService userService;

    // 取引の取得 (GET)
    @GetMapping
    public ResponseEntity<List<Trade>> getTrades(@RequestParam(required = false) Long userId) {
        if (userId != null) {
            List<Trade> trades = tradeService.getTradesByUserId(userId);
            return new ResponseEntity<>(trades, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(Collections.emptyList(), HttpStatus.OK);
        }
    }

    // 取引の登録 (POST)
    @PostMapping
    public ResponseEntity<Trade> createTrade(@RequestParam Long userId, @Valid @RequestBody TradeForm tradeForm) {
        Optional<User> user = userService.getUserById(userId);
        if (user.isPresent()) {
            Trade tradeDetails = new Trade();
            tradeDetails.setTradeType(tradeForm.getTradeType());
            tradeDetails.setAmount(tradeForm.getAmount());
            tradeDetails.setRate(tradeForm.getRate());
            tradeDetails.setLocalCurrencyName(tradeForm.getLocalCurrencyName());
            Trade createdTrade = tradeService.createTrade(user.get(), tradeDetails);
            return new ResponseEntity<>(createdTrade, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // マッチング処理のトリガー (POST)
    @PostMapping("/match")
    public ResponseEntity<Void> matchTrades() {
        tradeService.matchTrades();
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
