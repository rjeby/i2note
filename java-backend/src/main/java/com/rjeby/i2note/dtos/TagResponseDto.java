package com.rjeby.i2note.dtos;

import java.time.LocalDateTime;

public record TagResponseDto(Integer id,
        String content, LocalDateTime createdAt,
        LocalDateTime updatedAt) {

}
