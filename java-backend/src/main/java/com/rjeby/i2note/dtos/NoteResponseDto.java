package com.rjeby.i2note.dtos;

import java.time.LocalDateTime;
import java.util.List;

public record NoteResponseDto(
    Integer id,
    String title,
    String content,
    boolean isArchived,
    LocalDateTime createdAt,
    LocalDateTime updatedAt,
    List<TagResponseDto> tags
) {}