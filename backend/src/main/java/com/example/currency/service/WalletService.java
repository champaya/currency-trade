package com.example.currency.service;

import com.example.currency.domain.User;
import com.example.currency.domain.Wallet;
import com.example.currency.repository.WalletRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class WalletService {

    @Autowired
    private WalletRepository walletRepository;

    // ユーザーの全ウォレット取得
    public List<Wallet> getWalletsByUserId(Long userId) {
        return walletRepository.findByUser_UserId(userId);
    }

    // ウォレット取得
    public Optional<Wallet> getWalletById(Long walletId) {
        return walletRepository.findById(walletId);
    }

    // ウォレット登録
    public Wallet createWallet(User user, Wallet walletDetails) {
        Wallet wallet = new Wallet();
        wallet.setUser(user);
        wallet.setCurrencyType(walletDetails.getCurrencyType());
        wallet.setBalance(walletDetails.getBalance() != null ? walletDetails.getBalance() : BigDecimal.ZERO);
        return walletRepository.save(wallet);
    }

    // ウォレット更新
    public Wallet updateWallet(Long walletId, Wallet walletDetails) {
        return walletRepository.findById(walletId).map(wallet -> {
            wallet.setCurrencyType(walletDetails.getCurrencyType());
            wallet.setBalance(walletDetails.getBalance());
            wallet.setUpdatedAt(java.time.LocalDateTime.now());
            return walletRepository.save(wallet);
        }).orElseThrow(() -> new RuntimeException("Wallet not found"));
    }

    // ウォレット削除
    public void deleteWallet(Long walletId) {
        walletRepository.deleteById(walletId);
    }
}
