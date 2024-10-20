package com.example.currency.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.currency.domain.User;
import com.example.currency.form.UserForm;
import com.example.currency.service.UserService;

@RestController
@CrossOrigin
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<User> loginUser(@RequestBody UserForm userForm) {
        User user = new User();
        user.setEmail(userForm.getEmail());
        user.setPasswordHash(userForm.getPassword());
        User findUser = userService.loginUser(user);
        return new ResponseEntity<>(findUser, HttpStatus.OK);
    }
}
