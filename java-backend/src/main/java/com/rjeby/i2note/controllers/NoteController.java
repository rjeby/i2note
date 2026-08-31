package com.rjeby.i2note.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.rjeby.i2note.dtos.CreateNoteDto;
import com.rjeby.i2note.dtos.NoteResponseDto;
import com.rjeby.i2note.dtos.UpdateNoteDto;
import com.rjeby.i2note.models.Note;
import com.rjeby.i2note.services.NoteService;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/api/v1/notes")
public class NoteController {

    public final NoteService noteService;

    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    @GetMapping
    public List<NoteResponseDto> getAllUserNotes(@RequestHeader(required = false) String authorization) {

        return noteService.getAllUserNotes(authorization);
    }

    @PostMapping
    public NoteResponseDto createNote(@RequestHeader(required = false) String authorization,
            @RequestBody CreateNoteDto noteDto) {

        return noteService.createNote(noteDto, authorization);
    }

    @PatchMapping("/{id}")
    public NoteResponseDto patchNote(@RequestHeader(required = false) String authorization,
            @PathVariable(required = false) String id, @RequestBody UpdateNoteDto noteDto) {
        return noteService.patchNote(noteDto, authorization, id);
    }

    @PutMapping("/{id}/archive")
    public NoteResponseDto archiveNote(@RequestHeader(required = false) String authorization,
            @PathVariable(required = false) String id) {
        return noteService.archiveNote(id, authorization, true);
    }

    @PutMapping("/{id}/unarchive")
    public NoteResponseDto unarchiveNote(@RequestHeader(required = false) String authorization,
            @PathVariable(required = false) String id) {

        return noteService.archiveNote(id, authorization, false);
    }

    @DeleteMapping("/{id}")
    public NoteResponseDto deleteNote(@RequestHeader(required = false) String authorization,
            @PathVariable(required = false) String id) {

                return noteService.deleteNote(id, authorization);

    }

}
