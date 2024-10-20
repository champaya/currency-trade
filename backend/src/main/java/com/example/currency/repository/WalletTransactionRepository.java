package com.example.currency.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.currency.domain.WalletTransaction;
import com.example.currency.domain.TransactionType;
import java.util.List;

@Repository
public interface WalletTransactionRepository extends JpaRepository<WalletTransaction, Long> {

    // 特定のウォレットに関連するすべての取引を取得
    List<WalletTransaction> findByWallet_WalletIdOrderByCreatedAtDesc(Long walletId);

    // 特定のウォレットと取引タイプ（入金・出金）に基づく取引を取得
    List<WalletTransaction> findByWallet_WalletIdAndTransactionType(Long walletId, TransactionType transactionType);

}
