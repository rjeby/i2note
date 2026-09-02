package com.rjeby.i2note.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record SignInDto(
        @NotBlank(message = "Email is Required") @Email(message = "Email must be Valid") String email,
        @NotBlank(message = "Password is Required") String password) {

}
