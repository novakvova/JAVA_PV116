package org.example.controllers;

import lombok.RequiredArgsConstructor;
import org.example.dto.account.AuthResponseDto;
import org.example.dto.account.LoginDto;
import org.example.dto.account.RegisterDTO;
import org.example.services.AccountService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/account")
@RequiredArgsConstructor
public class AccountController {
    private final AccountService service;

    @PostMapping("login")
    public ResponseEntity<Object> login(@RequestBody LoginDto dto) {
        try {
            var auth = service.login(dto);
            return ResponseEntity.ok(auth);
        }
        catch (Exception ex) {
            return ResponseEntity.badRequest().body("Невірно введені дані! Спробуйте ще раз!");
        }
    }

    @PostMapping("register")
    public ResponseEntity<AuthResponseDto> register(@RequestBody RegisterDTO dto) {
        try {
            if(!dto.getPassword().equals(dto.getConfirmPassword()))
            {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
            var auth = service.register(dto);
            return ResponseEntity.ok(auth);
        }
        catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
