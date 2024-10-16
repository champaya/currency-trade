package com.example.currency.service;

import com.example.currency.domain.User;
import com.example.currency.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // 全ユーザー取得
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // 特定ユーザー取得
    public Optional<User> getUserById(Long userId) {
        return userRepository.findById(userId);
    }

    // ユーザー登録
    public User createUser(User user) {
        // 登録時に日時を設定
        user.setCreatedAt(java.time.LocalDateTime.now());
        user.setUpdatedAt(java.time.LocalDateTime.now());
        return userRepository.save(user);
    }

    // ユーザー更新
    public User updateUser(Long userId, User userDetails) {
        return userRepository.findById(userId).map(user -> {
            user.setUsername(userDetails.getUsername());
            user.setEmail(userDetails.getEmail());
            user.setPasswordHash(userDetails.getPasswordHash());
            user.setUpdatedAt(java.time.LocalDateTime.now());
            return userRepository.save(user);
        }).orElseThrow(() -> new RuntimeException("User not found"));
    }

    // ユーザー削除
    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }
}
