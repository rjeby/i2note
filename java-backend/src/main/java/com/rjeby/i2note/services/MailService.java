package com.rjeby.i2note.services;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailService {

    private final JavaMailSender mailSender;

    public MailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendVerificationEmail(String email, String token) {

        String verificationUrl =
                "http://localhost:8080/api/v1/verify-email?token=" + token;

        SimpleMailMessage message = new SimpleMailMessage();

        
        message.setTo(email);
        message.setSubject("Email Verification");
        message.setText(
                "Please click the following link to verify your email:\n\n"
                + verificationUrl
        );

        mailSender.send(message);
    }
}