package com.rjeby.i2note.services;

import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.rjeby.i2note.dtos.SignInDto;
import com.rjeby.i2note.dtos.SignUpDto;
import com.rjeby.i2note.models.User;
import com.rjeby.i2note.repositories.UserRepository;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final MailService mailService;

    private boolean isEmailValid(String email) {
        return email != null && email.matches("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$");
    }

    private boolean isPasswordValid(String password) {
        return password != null
                && password.matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$");
    }

    public AuthService(UserRepository userRepository, JwtService jwtService, PasswordEncoder passwordEncoder,
            MailService mailService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
        this.mailService = mailService;

    }

    public String signIn(SignInDto signInDto) {
        String email = signInDto.email();
        String password = signInDto.password();
        if (!isEmailValid(email)) {
            throw new IllegalArgumentException("Invalid Email");
        }
        if (!isPasswordValid(password)) {
            throw new IllegalArgumentException("Invalid Password");
        }

        Optional<User> optional = userRepository.findByEmail(email);
        if (optional.isEmpty()) {
            throw new IllegalArgumentException("Email doesn't Exist");

        }

        User user = optional.get();

        if (Boolean.FALSE.equals(user.getIsVerified())) {
            throw new IllegalArgumentException("Email Must be Verified");

        }

        boolean isPasswordCorrect = passwordEncoder.matches(password, user.getPassword());
        if (!isPasswordCorrect) {
            throw new IllegalArgumentException("Incorrect Password");
        }

        String token = jwtService.generateToken(email, 15);
        return token;

    }

    public void signUp(SignUpDto signUpDto) {
        String email = signUpDto.email();
        String password = signUpDto.password();
        if (!isEmailValid(email)) {
            throw new IllegalArgumentException("Invalid Email");
        }
        if (!isPasswordValid(password)) {
            throw new IllegalArgumentException("Invalid Password");
        }

        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isPresent() && Boolean.TRUE.equals(optionalUser.get().getIsVerified())) {
            throw new IllegalArgumentException("Email is Already Used");
        }
        String hash = passwordEncoder.encode(password);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setEmail(email);
            user.setPassword(hash);
            userRepository.save(user);
            return;
        }

        userRepository.save(User.builder().email(email).password(hash).isVerified(false).build());
        String token = jwtService.generateToken(email, 60);
        mailService.sendVerificationEmail(email, token);

    }

    public void verifyEmail(String token) {
        String email = jwtService.getEmailFromToken(token);
        Optional<User> optional = userRepository.findByEmail(email);
        if (optional.isEmpty()) {
            throw new IllegalArgumentException("Invalid Token");
        }

        User user = optional.get();
        if (Boolean.TRUE.equals(user.getIsVerified())) {
            throw new IllegalArgumentException("Email is Already Verified");
        }

        user.setIsVerified(true);
        userRepository.save(user);

    }

}
