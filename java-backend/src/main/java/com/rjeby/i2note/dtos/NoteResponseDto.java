package com.rjeby.i2note.dtos;

import java.util.List;

public record NoteResponseDto(Integer id,
        String title,
        String content,
        boolean isArchived,
        List<String> tags) {

}
