package com.rjeby.i2note.services;

import com.rjeby.i2note.repositories.NoteRepository;
import com.rjeby.i2note.repositories.TagRepository;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.rjeby.i2note.dtos.CreateNoteDto;
import com.rjeby.i2note.dtos.NoteResponseDto;
import com.rjeby.i2note.dtos.TagResponseDto;
import com.rjeby.i2note.dtos.UpdateNoteDto;
import com.rjeby.i2note.models.Note;
import com.rjeby.i2note.models.Tag;
import com.rjeby.i2note.models.User;
import com.rjeby.i2note.repositories.UserRepository;

@Service
public class NoteService {

    private final TagRepository tagRepository;
    private final NoteRepository noteRepository;
    public final JwtService jwtService;
    public final UserRepository userRepository;

    public NoteService(JwtService jwtService, UserRepository userRepository, NoteRepository noteRepository,
            TagRepository tagRepository) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
        this.noteRepository = noteRepository;
        this.tagRepository = tagRepository;
    }

    private boolean isTitleValid(String title) {

        return title != null && title.trim().length() > 0;
    }

    private boolean isContentValid(String content) {
        return content != null;
    }

    private boolean isTagsValid(List<String> tags) {
        return tags != null && tags.stream().allMatch(tag -> isTagValid(tag));
    }

    private boolean isTagValid(String content) {
        return content != null;
    }

    private boolean isIdValid(String id) {

        if (id == null || id.isBlank()) {
            return false;
        }
        try {
            long value = Integer.parseInt(id);
            return value > 0;
        } catch (NumberFormatException e) {
            return false;
        }
    }

    private NoteResponseDto noteToNoteResponseDto(Note note) {
        List<TagResponseDto> tags = note.getTags().stream().map(t -> tagToTagResponseDto(t)).toList();
        return new NoteResponseDto(note.getId(), note.getTitle(), note.getContent(), note.getIsArchived(),
                note.getCreatedAt(), note.getUpdatedAt(), tags);
    }

    private TagResponseDto tagToTagResponseDto(Tag tag) {
        return new TagResponseDto(tag.getId(), tag.getContent(), tag.getCreatedAt(), tag.getUpdatedAt());
    }

    public List<NoteResponseDto> getAllUserNotes(String token) {
        String email = jwtService.getEmailFromToken(token);
        Optional<User> optional = userRepository.findByEmail(email);
        if (optional.isEmpty()) {
            throw new IllegalArgumentException("User doesn't Exist");
        }

        User user = optional.get();
        return user.getNotes().stream().map(n -> noteToNoteResponseDto(n)).toList();

    }

    public NoteResponseDto createNote(CreateNoteDto noteDto, String token) {
        String email = jwtService.getEmailFromToken(token);
        Optional<User> optional = userRepository.findByEmail(email);
        if (optional.isEmpty()) {
            throw new IllegalArgumentException("User doesn't Exist");
        }
        String title = noteDto.title();
        String content = noteDto.content();
        List<String> tagContents = noteDto.tags();

        if (!isTitleValid(title)) {
            throw new IllegalArgumentException("Invalid Title");
        }

        if (!isContentValid(content)) {
            throw new IllegalArgumentException("Invalid Content");
        }

        if (!isTagsValid(tagContents)) {
            throw new IllegalArgumentException("Invalid Tags");
        }

        User user = optional.get();

        List<Tag> tags = tagContents.stream()
                .map(c -> tagRepository.findByContent(c)
                        .orElseGet(() -> tagRepository.save(
                                Tag.builder()
                                        .content(c)

                                        .build())))
                .toList();
        Note note = Note.builder().title(title).content(content).isArchived(false).user(user).tags(tags).build();
        noteRepository.save(note);
        return noteToNoteResponseDto(note);
    }

    public NoteResponseDto patchNote(UpdateNoteDto noteDto, String token, String id) {

        if (!isIdValid(id)) {
            throw new IllegalArgumentException("Invalid Note ID");
        }

        Integer noteId = Integer.parseInt(id);
        String email = jwtService.getEmailFromToken(token);
        String title = noteDto.title();
        String content = noteDto.content();
        List<String> tagContents = noteDto.tags();

        Optional<User> optional = userRepository.findByEmail(email);

        if (optional.isEmpty()) {
            throw new IllegalArgumentException("User doesn't Exist");
        }

        User user = optional.get();

        if (!isTitleValid(title)) {
            throw new IllegalArgumentException("Invalid Title");
        }

        if (!isContentValid(content)) {
            throw new IllegalArgumentException("Invalid Content");
        }

        if (!isTagsValid(tagContents)) {
            throw new IllegalArgumentException("Invalid Tags");
        }

        Optional<Note> optionalNote = noteRepository.findById(noteId);
        if (optionalNote.isEmpty()) {
            throw new IllegalArgumentException("Note is not Found");
        }

        Note note = optionalNote.get();

        if (note.getUser().getId() != user.getId()) {
            throw new IllegalArgumentException("Forbidden");
        }
        List<Tag> tags = tagContents.stream()
                .map(c -> tagRepository.findByContent(c)
                        .orElseGet(() -> tagRepository.save(
                                Tag.builder()
                                        .content(c)

                                        .build())))
                .collect(Collectors.toList());

        note.setTitle(title);
        note.setContent(content);
        note.setTags(tags);

        Note saved = noteRepository.save(note);
        return noteToNoteResponseDto(saved);
    }

    public NoteResponseDto archiveNote(String id, String token, boolean archive) {

        if (!isIdValid(id)) {
            throw new IllegalArgumentException("Invalid Note ID");
        }

        Integer noteId = Integer.parseInt(id);
        String email = jwtService.getEmailFromToken(token);

        Optional<User> optional = userRepository.findByEmail(email);

        if (optional.isEmpty()) {
            throw new IllegalArgumentException("User doesn't Exist");
        }

        User user = optional.get();

        Optional<Note> optionalNote = noteRepository.findById(noteId);
        if (optionalNote.isEmpty()) {
            throw new IllegalArgumentException("Note is not Found");
        }

        Note note = optionalNote.get();

        if (note.getUser().getId() != user.getId()) {
            throw new IllegalArgumentException("Forbidden");
        }

        note.setIsArchived(archive);
        Note saved = noteRepository.save(note);
        return noteToNoteResponseDto(saved);
    }

    public NoteResponseDto deleteNote(String id, String token) {
        if (!isIdValid(id)) {
            throw new IllegalArgumentException("Invalid Note ID");
        }
        Integer noteId = Integer.parseInt(id);
        String email = jwtService.getEmailFromToken(token);

        Optional<User> optional = userRepository.findByEmail(email);

        if (optional.isEmpty()) {
            throw new IllegalArgumentException("User doesn't Exist");
        }

        Optional<Note> optionalNote = noteRepository.findById(noteId);
        if (optionalNote.isEmpty()) {
            throw new IllegalArgumentException("Note is not Found");
        }
        User user = optional.get();
        Note note = optionalNote.get();

        if (note.getUser().getId() != user.getId()) {
            throw new IllegalArgumentException("Forbidden");
        }

        NoteResponseDto deleted = noteToNoteResponseDto(note);
        noteRepository.delete(note);
        return deleted;
    }

}
