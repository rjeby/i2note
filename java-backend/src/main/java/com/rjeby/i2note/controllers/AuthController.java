package com.rjeby.i2note.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.rjeby.i2note.dtos.SignInDto;
import com.rjeby.i2note.dtos.SignInResponseDto;
import com.rjeby.i2note.dtos.ResponseMessageDto;

import com.rjeby.i2note.dtos.SignUpDto;
import com.rjeby.i2note.services.AuthService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/sign-up")
    public ResponseEntity<ResponseMessageDto> signUp(@Valid @RequestBody SignUpDto signUpDto) {

        authService.signUp(signUpDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(new ResponseMessageDto("Please Verify your Email"));

    }

    @PostMapping("/sign-in")
    public ResponseEntity<SignInResponseDto> signIn(@Valid @RequestBody SignInDto authRequestDto) {
        return ResponseEntity.status(HttpStatus.OK).body(authService.signIn(authRequestDto));

    }

    @GetMapping("/verify-email")
    public ResponseEntity<ResponseMessageDto> verifyEmail(@RequestParam(required = true) String token) {
        authService.verifyEmail(token);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessageDto("Email Verified Successfully"));

    }

}
