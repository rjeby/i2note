package com.rjeby.i2note.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.rjeby.i2note.dto.ResponseMessageDto;
import com.rjeby.i2note.dto.SignInDto;
import com.rjeby.i2note.dto.SignInResponseDto;
import com.rjeby.i2note.dto.SignUpDto;
import com.rjeby.i2note.services.AuthService;

@RestController
@RequestMapping("/api/v1")
public class AuthContoller {

    private final AuthService authService;

    public AuthContoller(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/sign-up")
    public ResponseEntity<ResponseMessageDto> signUp(@RequestBody SignUpDto signUpDto) {

        authService.signUp(signUpDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(new ResponseMessageDto("Please Verify your Email"));

    }

    @PostMapping("/sign-in")
    public ResponseEntity<SignInResponseDto> signIn(@RequestBody SignInDto signInDto) {
        String token = authService.signIn(signInDto);
        return ResponseEntity.status(HttpStatus.OK).body(new SignInResponseDto(token));

    }

    @GetMapping("/verify-email")
    public ResponseEntity<ResponseMessageDto> verifyEmail(@RequestParam(required = false) String token) {
        authService.verifyEmail(token);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessageDto("Email Verified Successfully"));

    }

}
