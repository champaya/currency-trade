package com.example.currency.controller;

import com.example.currency.domain.User;
import com.example.currency.form.UserForm;
import com.example.currency.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    // 特定のユーザーを取得 (GET)
    @GetMapping("/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable Long userId) {
        Optional<User> user = userService.getUserById(userId);
        return user.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // ユーザーの登録 (POST)
    @PostMapping
    public ResponseEntity<User> createUser(@Valid @RequestBody UserForm userForm) {
        User user = new User();
        user.setUsername(userForm.getUsername());
        user.setEmail(userForm.getEmail());
        user.setPasswordHash(userForm.getPassword()); // TODO 実際はハッシュ化が必要
        User createdUser = userService.createUser(user);
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    // ユーザーの更新 (PUT)
    @PutMapping("/{userId}")
    public ResponseEntity<User> updateUser(@PathVariable Long userId, @Valid @RequestBody UserForm userForm) {
        User userDetails = new User();
        userDetails.setUsername(userForm.getUsername());
        userDetails.setEmail(userForm.getEmail());
        User updatedUser = userService.updateUser(userId, userDetails);
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }

    // ユーザーの削除 (DELETE)
    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long userId) {
        userService.deleteUser(userId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
