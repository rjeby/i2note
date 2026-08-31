package com.rjeby.i2note.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.resource.NoResourceFoundException;
import org.springframework.security.oauth2.jwt.JwtException;

import com.rjeby.i2note.dto.ResponseMessageDto;

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

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ResponseMessageDto> handleException(Exception e) {
        System.err.println(e.getMessage());
        

        ResponseMessageDto error = new ResponseMessageDto("Internal Server Error");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }

}