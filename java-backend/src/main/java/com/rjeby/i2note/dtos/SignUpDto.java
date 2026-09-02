package com.rjeby.i2note.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record SignUpDto(
        @NotBlank(message = "Email is Required") @Email(message = "Email must be Valid") String email,

        @NotBlank(message = "Password is Required") @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$", message = "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one digit, and one special character") String password) {

}
