package com.example.currency.controller;

import com.example.currency.domain.Rate;
import com.example.currency.service.RateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/rates")
public class RateController {

    @Autowired
    private RateService rateService;

    /**
     * 最新のレートを取得
     */
    @GetMapping("/latest")
    public ResponseEntity<Rate> getLatestRate(
            @RequestParam String numeratorCurrency,
            @RequestParam String denominatorCurrency) {
        Rate rate = rateService.getLatestRate(numeratorCurrency, denominatorCurrency);
        if (rate != null) {
            return new ResponseEntity<>(rate, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    /**
     * 過去1000件のレート履歴を取得
     */
    @GetMapping("/history")
    public ResponseEntity<List<Rate>> getRateHistory(
            @RequestParam String numeratorCurrency,
            @RequestParam String denominatorCurrency) {
        List<Rate> rateHistory = rateService.getRateHistory(numeratorCurrency, denominatorCurrency);
        return new ResponseEntity<>(rateHistory, HttpStatus.OK);
    }
}
