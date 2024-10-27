package com.example.currency.service;

import com.example.currency.domain.CurrencyType;
import com.example.currency.domain.Rate;
import com.example.currency.domain.TransactionType;
import com.example.currency.domain.User;
import com.example.currency.domain.Wallet;
import com.example.currency.domain.WalletTransaction;
import com.example.currency.repository.WalletRepository;
import com.example.currency.repository.WalletTransactionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class WalletService {

    @Autowired
    private WalletRepository walletRepository;

    @Autowired
    private WalletTransactionRepository walletTransactionRepository;

    @Autowired
    private RateService rateService;

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

    // ウォレットの取引履歴を取得
    public List<WalletTransaction> getTransactionHistory(Long walletId) {
        return walletTransactionRepository.findByWallet_WalletIdOrderByCreatedAtDesc(walletId);
    }

    /**
     * 入金処理
     * 
     * @param walletId
     * @param amount
     */
    @Transactional
    public void deposit(Long walletId, BigDecimal amount) {
        Wallet wallet = walletRepository.findById(walletId)
                .orElseThrow(() -> new RuntimeException("ウォレットが見つかりません"));

        // ウォレットの通貨が現金ではない場合のエラーハンドリング
        if (wallet.getCurrencyType() != CurrencyType.CASH) {
            throw new RuntimeException("ウォレットの通貨が現金ではありません");
        }

        wallet.setBalance(wallet.getBalance().add(amount));
        walletRepository.save(wallet);

        // 取引を記録
        WalletTransaction transaction = new WalletTransaction();
        transaction.setWallet(wallet);
        transaction.setTransactionType(TransactionType.DEPOSIT);
        transaction.setAmount(amount);
        transaction.setBalanceAfter(wallet.getBalance());
        walletTransactionRepository.save(transaction);
    }

    /**
     * 出金処理
     * 
     * @param walletId
     * @param amount
     */
    @Transactional
    public void withdraw(Long walletId, BigDecimal amount) {
        // ウォレットの存在確認
        Wallet wallet = walletRepository.findById(walletId)
                .orElseThrow(() -> new RuntimeException("Wallet not found"));

        // ウォレットの通貨が現金ではない場合のエラーハンドリング
        if (wallet.getCurrencyType() != CurrencyType.CASH) {
            throw new RuntimeException("ウォレットの通貨が現金ではありません");
        }
        // 残高不足の場合のエラーハンドリング
        if (wallet.getBalance().compareTo(amount) < 0) {
            throw new RuntimeException("残高が不足しています");
        }

        // 残高を減らす
        wallet.setBalance(wallet.getBalance().subtract(amount));
        walletRepository.save(wallet);

        // 取引を記録
        WalletTransaction transaction = new WalletTransaction();
        transaction.setWallet(wallet);
        transaction.setTransactionType(TransactionType.WITHDRAWAL);
        transaction.setAmount(amount);
        transaction.setBalanceAfter(wallet.getBalance());
        walletTransactionRepository.save(transaction);
    }

    /**
     * 現金から地域通貨への変換処理
     * 
     * @param userId            ユーザーID
     * @param cashAmount        変換する現金量
     * @param localCurrencyName 地域通貨名
     * @return 変換後の地域通貨ウォレット
     */
    @Transactional
    public Wallet convertCashToLocalCurrency(Long userId, BigDecimal cashAmount, String localCurrencyName) {
        // 現金ウォレットの取得
        Wallet cashWallet = getWalletsByUserId(userId).stream()
                .filter(w -> w.getCurrencyType() == CurrencyType.CASH)
                .findFirst()
                .orElseThrow(() -> new RuntimeException("現金ウォレットが見つかりません"));

        // 残高チェック
        if (cashWallet.getBalance().compareTo(cashAmount) < 0) {
            throw new RuntimeException("現金残高が不足しています");
        }

        // 最新のレートを取得
        Rate currentRate = rateService.getLatestRate("LOCAL_CURRENCY", "CASH");
        if (currentRate == null) {
            throw new RuntimeException("レートが見つかりません");
        }

        // 地域通貨量を計算（現金量 * レート）
        BigDecimal localCurrencyAmount = cashAmount.multiply(currentRate.getRate());

        // 地域通貨ウォレットの取得または作成
        Wallet localCurrencyWallet = getWalletsByUserId(userId).stream()
                .filter(w -> w.getCurrencyType() == CurrencyType.LOCAL_CURRENCY
                        && w.getLocalCurrencyName().equals(localCurrencyName))
                .findFirst()
                .orElseGet(() -> {
                    Wallet newWallet = new Wallet();
                    newWallet.setUser(cashWallet.getUser());
                    newWallet.setCurrencyType(CurrencyType.LOCAL_CURRENCY);
                    newWallet.setLocalCurrencyName(localCurrencyName);
                    newWallet.setBalance(BigDecimal.ZERO);
                    return walletRepository.save(newWallet);
                });

        // 現金を減らす
        cashWallet.setBalance(cashWallet.getBalance().subtract(cashAmount));
        walletRepository.save(cashWallet);

        // 地域通貨を増やす
        localCurrencyWallet.setBalance(localCurrencyWallet.getBalance().add(localCurrencyAmount));
        walletRepository.save(localCurrencyWallet);

        // 取引履歴を記録（現金の出金）
        WalletTransaction cashTransaction = new WalletTransaction();
        cashTransaction.setWallet(cashWallet);
        cashTransaction.setTransactionType(TransactionType.WITHDRAWAL);
        cashTransaction.setAmount(cashAmount);
        cashTransaction.setBalanceAfter(cashWallet.getBalance());
        walletTransactionRepository.save(cashTransaction);

        // 取引履歴を記録（地域通貨の入金）
        WalletTransaction localTransaction = new WalletTransaction();
        localTransaction.setWallet(localCurrencyWallet);
        localTransaction.setTransactionType(TransactionType.DEPOSIT);
        localTransaction.setAmount(localCurrencyAmount);
        localTransaction.setBalanceAfter(localCurrencyWallet.getBalance());
        walletTransactionRepository.save(localTransaction);

        return localCurrencyWallet;
    }
}
