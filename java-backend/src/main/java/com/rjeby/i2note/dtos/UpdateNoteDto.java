package com.rjeby.i2note.dtos;

import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record UpdateNoteDto(
                @NotBlank(message = "Title is Required") String title,
                @NotBlank(message = "Content is Required") String content,
                @NotNull(message = "Tags are Required") List<@NotBlank(message = "Tag cannot be blank") String> tags) {
}