package com.example.currency.controller;

import com.example.currency.domain.User;
import com.example.currency.domain.Wallet;
import com.example.currency.domain.WalletTransaction;
import com.example.currency.form.WalletForm;
import com.example.currency.service.UserService;
import com.example.currency.service.WalletService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/api/wallets")
public class WalletController {

    @Autowired
    private WalletService walletService;

    @Autowired
    private UserService userService;

    // ユーザーの全ウォレットを取得 (GET)
    @GetMapping
    public ResponseEntity<List<Wallet>> getWalletsByUserId(@RequestParam Long userId) {
        List<Wallet> wallets = walletService.getWalletsByUserId(userId);
        return new ResponseEntity<>(wallets, HttpStatus.OK);
    }

    // ウォレットの登録 (POST)
    @PostMapping
    public ResponseEntity<Wallet> createWallet(@RequestParam Long userId, @Valid @RequestBody WalletForm walletForm) {
        Optional<User> user = userService.getUserById(userId);
        if (user.isPresent()) {
            Wallet walletDetails = new Wallet();
            walletDetails.setCurrencyType(walletForm.getCurrencyType());
            walletDetails.setBalance(walletForm.getBalance());
            Wallet createdWallet = walletService.createWallet(user.get(), walletDetails);
            return new ResponseEntity<>(createdWallet, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // ウォレットの更新 (PUT)
    @PutMapping("/{walletId}")
    public ResponseEntity<Wallet> updateWallet(@PathVariable Long walletId, @Valid @RequestBody WalletForm walletForm) {
        Wallet walletDetails = new Wallet();
        walletDetails.setCurrencyType(walletForm.getCurrencyType());
        walletDetails.setBalance(walletForm.getBalance());
        Wallet updatedWallet = walletService.updateWallet(walletId, walletDetails);
        return new ResponseEntity<>(updatedWallet, HttpStatus.OK);
    }

    // ウォレットの削除 (DELETE)
    @DeleteMapping("/{walletId}")
    public ResponseEntity<Void> deleteWallet(@PathVariable Long walletId) {
        walletService.deleteWallet(walletId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // ウォレットの取引履歴を取得 (GET)
    @GetMapping("/{walletId}/transactions")
    public ResponseEntity<List<WalletTransaction>> getTransactionHistory(@PathVariable Long walletId) {
        List<WalletTransaction> transactions = walletService.getTransactionHistory(walletId);
        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }

    // TODO POSTなのにRequestParamを使っている。クエリパラメータ使わざるを得なくなっている。
    // ウォレットの入金 (POST)
    @PostMapping("/{walletId}/deposit")
    public ResponseEntity<Void> deposit(@PathVariable Long walletId, @RequestParam BigDecimal amount) {
        walletService.deposit(walletId, amount);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // TODO POSTなのにRequestParamを使っている。クエリパラメータ使わざるを得なくなっている。
    // ウォレットの出金 (POST)
    @PostMapping("/{walletId}/withdraw")
    public ResponseEntity<Void> withdraw(@PathVariable Long walletId, @RequestParam BigDecimal amount) {
        walletService.withdraw(walletId, amount);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    /**
     * 現金から地域通貨への変換
     */
    @PostMapping("/convert")
    public ResponseEntity<Wallet> convertCashToLocalCurrency(
            @RequestParam Long userId,
            @RequestParam BigDecimal cashAmount,
            @RequestParam String localCurrencyName) {
        try {
            Wallet convertedWallet = walletService.convertCashToLocalCurrency(
                    userId, cashAmount, localCurrencyName);
            return new ResponseEntity<>(convertedWallet, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
