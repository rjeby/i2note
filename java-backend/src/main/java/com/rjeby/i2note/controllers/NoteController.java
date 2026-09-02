package com.rjeby.i2note.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.rjeby.i2note.dtos.CreateNoteDto;
import com.rjeby.i2note.dtos.NoteResponseDto;
import com.rjeby.i2note.dtos.UpdateNoteDto;
import com.rjeby.i2note.services.NoteService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@CrossOrigin(origins = "http://localhost:5173", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
        RequestMethod.DELETE, RequestMethod.OPTIONS })
@RequestMapping("/api/notes")
@RequiredArgsConstructor
public class NoteController {

    private final NoteService noteService;

    @GetMapping
    public ResponseEntity<List<NoteResponseDto>> getAllUserNotes(Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.status(HttpStatus.OK).body(noteService.getAllUserNotes(email));
    }

    @PostMapping
    public ResponseEntity<NoteResponseDto> createUserNote(Authentication authentication,
            @Valid @RequestBody CreateNoteDto noteDto) {
        String email = authentication.getName();
        return ResponseEntity.status(HttpStatus.CREATED).body(noteService.createUserNote(email, noteDto));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<NoteResponseDto> patchNote(Authentication authentication,
            @PathVariable @Validated @Positive Integer id, @Valid @RequestBody UpdateNoteDto noteDto) {
        String email = authentication.getName();
        return ResponseEntity.status(HttpStatus.OK).body(noteService.patchUserNote(email, id, noteDto));
    }

    @PutMapping("/{id}/archive")
    public ResponseEntity<NoteResponseDto> archiveUserNote(Authentication authentication,
            @PathVariable @Validated @Positive Integer id) {
        String email = authentication.getName();
        return ResponseEntity.status(HttpStatus.OK).body(noteService.archiveUserNote(email, id, true));
    }

    @PutMapping("/{id}/unarchive")
    public ResponseEntity<NoteResponseDto> unarchiveUserNote(Authentication authentication,
            @PathVariable @Validated @Positive Integer id) {
        String email = authentication.getName();

        return ResponseEntity.status(HttpStatus.OK).body(noteService.archiveUserNote(email, id, false));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<NoteResponseDto> deleteUserNote(Authentication authentication,
            @PathVariable @Validated @Positive Integer id) {
        String email = authentication.getName();
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(noteService.deleteUserNote(email, id));

    }

}
