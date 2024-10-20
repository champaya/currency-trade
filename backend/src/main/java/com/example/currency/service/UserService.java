package com.example.currency.service;

import com.example.currency.domain.CurrencyType;
import com.example.currency.domain.User;
import com.example.currency.domain.Wallet;
import com.example.currency.repository.UserRepository;
import com.example.currency.repository.WalletRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private WalletRepository walletRepository;

    // 特定ユーザー取得
    public Optional<User> getUserById(Long userId) {
        return userRepository.findById(userId);
    }

    // ユーザー登録
    @Transactional
    public User createUser(User user) {
        // 登録時に日時を設定
        user.setCreatedAt(java.time.LocalDateTime.now());
        user.setUpdatedAt(java.time.LocalDateTime.now());
        User savedUser = userRepository.save(user);

        // ユーザ作成と同時に現金のウォレットを作成
        Wallet cashWallet = new Wallet();
        cashWallet.setUser(user);
        cashWallet.setCurrencyType(CurrencyType.CASH);
        walletRepository.save(cashWallet);

        return savedUser;
    }

    // ユーザー更新
    public User updateUser(Long userId, User userDetails) {
        return userRepository.findById(userId).map(user -> {
            user.setUsername(userDetails.getUsername());
            user.setEmail(userDetails.getEmail());
            user.setUpdatedAt(java.time.LocalDateTime.now());
            return userRepository.save(user);
        }).orElseThrow(() -> new RuntimeException("User not found"));
    }

    // ユーザー削除
    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }

    // ログイン処理
    // TODO Userを返すのではなくて、認証結果を返す
    public User loginUser(User user) {
        return userRepository.findByEmailAndPasswordHash(user.getEmail(), user.getPasswordHash())
                .orElseThrow(() -> new RuntimeException("ユーザーが見つかりません"));
    }
}
