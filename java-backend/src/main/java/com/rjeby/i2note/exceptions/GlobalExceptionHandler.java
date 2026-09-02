package com.rjeby.i2note.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import com.rjeby.i2note.dtos.ResponseMessageDto;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.oauth2.jwt.JwtException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler({
            NoResourceFoundException.class,
            HttpRequestMethodNotSupportedException.class
    })
    public ResponseEntity<ResponseMessageDto> handleNoResourceFound() {
        ResponseMessageDto error = new ResponseMessageDto("Resource Not Found");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ResponseMessageDto> handleIllegalArgumentException(IllegalArgumentException e) {
        ResponseMessageDto error = new ResponseMessageDto(e.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }

    @ExceptionHandler(JwtException.class)
    public ResponseEntity<ResponseMessageDto> handleJwtException(JwtException e) {
        ResponseMessageDto error = new ResponseMessageDto("Invalid Token");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ResponseMessageDto> handlemMethodArgumentNotValidException(
            MethodArgumentNotValidException e) {
        String message = e.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(error -> error.getDefaultMessage())
                .findFirst()
                .orElse("Invalid Method Argument");
        ResponseMessageDto error = new ResponseMessageDto(message);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }

    @ExceptionHandler(DisabledException.class)
    public ResponseEntity<ResponseMessageDto> handleDisabledException(DisabledException e) {
        ResponseMessageDto error = new ResponseMessageDto("User must be Verified");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }

    @ExceptionHandler(BadCredentialsException.class)

    public ResponseEntity<ResponseMessageDto> handleBadCredentialsException(BadCredentialsException e) {
        ResponseMessageDto error = new ResponseMessageDto("Bad Credentials");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ResponseMessageDto> handleMessageNoteReadableException(HttpMessageNotReadableException e) {
        ResponseMessageDto error = new ResponseMessageDto("Invalid Field Type");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);

    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ResponseMessageDto> handleException(Exception e) {
        e.printStackTrace();
        ;

        ResponseMessageDto error = new ResponseMessageDto("Internal Server Error");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }

}