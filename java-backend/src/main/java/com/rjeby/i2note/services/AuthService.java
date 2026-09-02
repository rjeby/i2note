package com.rjeby.i2note.services;

import java.util.Optional;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.rjeby.i2note.dtos.SignInDto;
import com.rjeby.i2note.dtos.SignInResponseDto;
import com.rjeby.i2note.dtos.SignUpDto;
import com.rjeby.i2note.models.User;
import com.rjeby.i2note.repositories.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final MailService mailService;

    public SignInResponseDto signIn(SignInDto signInDto) {
        var token = new UsernamePasswordAuthenticationToken(signInDto.email(), signInDto.password());
        Authentication authentication = authenticationManager.authenticate(token);

        String jwtToken = jwtService.generateAccessToken(authentication);
        Long expiresAt = jwtService.extractExpirationTime(jwtToken);

        return new SignInResponseDto(jwtToken, authentication.getName(), expiresAt);
    }

    public void signUp(SignUpDto signUpDto) {
        String email = signUpDto.email();
        String password = signUpDto.password();

        Optional<User> optionalUser = userRepository.findByEmail(email);

        if (optionalUser.isPresent() && optionalUser.get().isVerified()) {
            throw new IllegalArgumentException("Email is already used");
        }

        String hash = passwordEncoder.encode(password);

        User user = optionalUser.orElseGet(() -> User.builder()
                .email(email)
                .isVerified(false)
                .build());

        user.setEmail(email);
        user.setPassword(hash);

        userRepository.save(user);

        String token = jwtService.generateVerificationToken(email);
        mailService.sendVerificationEmail(email, token);
    }

    public void verifyEmail(String token) {

        String email = jwtService.extractSubject(token);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Invalid Token"));

        if (user.isVerified()) {
            throw new IllegalArgumentException("Email is Already Verified");
        }

        user.setVerified(true);;
        userRepository.save(user);
    }

}
