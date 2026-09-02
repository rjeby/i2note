package com.rjeby.i2note.services;

import com.rjeby.i2note.repositories.NoteRepository;
import com.rjeby.i2note.repositories.TagRepository;
import java.util.List;
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

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NoteService {

        private final TagRepository tagRepository;
        private final NoteRepository noteRepository;
        private final UserRepository userRepository;

        public List<NoteResponseDto> getAllUserNotes(String email) {
                User user = userRepository.findByEmail(email)
                                .orElseThrow(() -> new IllegalArgumentException("User not found"));
                return user.getNotes().stream().map(this::noteToNoteResponseDto).toList();

        }

        public NoteResponseDto createUserNote(String email, CreateNoteDto noteDto) {
                User user = userRepository.findByEmail(email)
                                .orElseThrow(() -> new IllegalArgumentException("User not found"));
                String title = noteDto.title();
                String content = noteDto.content();
                List<String> tagContents = noteDto.tags();

                List<Tag> tags = tagContents.stream()
                                .map(c -> tagRepository.findByContent(c)
                                                .orElseGet(() -> tagRepository.save(
                                                                Tag.builder()
                                                                                .content(c)

                                                                                .build())))
                                .toList();
                Note note = Note.builder().title(title).content(content).isArchived(false).user(user).tags(tags)
                                .build();
                noteRepository.save(note);
                return noteToNoteResponseDto(note);
        }

        public NoteResponseDto patchUserNote(String email, Integer id, UpdateNoteDto noteDto) {

                String title = noteDto.title();
                String content = noteDto.content();
                List<String> tagNames = noteDto.tags();

                User user = getUserByEmail(email);
                Note note = getOwnedNote(user, id);
                List<Tag> tags = resolveTags(tagNames);

                note.setTitle(title);
                note.setContent(content);
                note.setTags(tags);

                Note saved = noteRepository.save(note);
                return noteToNoteResponseDto(saved);
        }

        public NoteResponseDto archiveUserNote(String email, Integer id, boolean archiveStatus) {

                User user = getUserByEmail(email);

                Note note = getOwnedNote(user, id);

                note.setArchived(archiveStatus);
                Note saved = noteRepository.save(note);
                return noteToNoteResponseDto(saved);
        }

        public NoteResponseDto deleteUserNote(String email, Integer id) {

                User user = getUserByEmail(email);

                Note note = getOwnedNote(user, id);

                NoteResponseDto deleted = noteToNoteResponseDto(note);
                noteRepository.delete(note);
                return deleted;
        }

        private User getUserByEmail(String email) {
                User user = userRepository.findByEmail(email)
                                .orElseThrow(() -> new IllegalArgumentException("User not found"));
                return user;
        }

        private Note getOwnedNote(User user, Integer noteId) {
                Note note = noteRepository.findById(noteId)
                                .orElseThrow(() -> new IllegalArgumentException("Note not found"));
                Integer noteOwnerId = note.getUser().getId();
                if (noteOwnerId.equals(user.getId())) {
                        throw new IllegalArgumentException("Forbidden");
                }
                return note;

        }

        private List<Tag> resolveTags(List<String> tagNames) {
                List<Tag> tags = tagNames.stream()
                                .map(c -> tagRepository.findByContent(c)
                                                .orElseGet(() -> tagRepository.save(
                                                                Tag.builder()
                                                                                .content(c)

                                                                                .build())))
                                .collect(Collectors.toList());
                return tags;
        }

        private NoteResponseDto noteToNoteResponseDto(Note note) {
                List<TagResponseDto> tags = note.getTags().stream().map(t -> tagToTagResponseDto(t)).toList();
                return new NoteResponseDto(note.getId(), note.getTitle(), note.getContent(), note.isArchived(),
                                note.getCreatedAt(), note.getUpdatedAt(), tags);
        }

        private TagResponseDto tagToTagResponseDto(Tag tag) {
                return new TagResponseDto(tag.getId(), tag.getContent(), tag.getCreatedAt(), tag.getUpdatedAt());
        }

}
