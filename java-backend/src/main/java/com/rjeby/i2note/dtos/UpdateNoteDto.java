package com.rjeby.i2note.dtos;

import java.util.List;

public record UpdateNoteDto(
        String title,
        String content,
        List<String> tags) {
}