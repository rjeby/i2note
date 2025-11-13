import type { Note, NoteTag, Tag } from "../types";
import { notes, tags, noteTags } from "../data";
import { createSelector, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { selectFilterByTitle, selectSelectedNoteId, selectSelectedNoteType, selectSelectedTagId } from "./homeSlice";

type NotePayload = Omit<Note, "createdAt" | "editedAt"> & { tags: string[] };

interface DataState {
  notes: Note[];
  tags: Tag[];
  noteTags: NoteTag[];
}

const initialState: DataState = {
  notes: notes,
  tags: tags,
  noteTags: noteTags,
};
export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Omit<NotePayload, "id">>) => {
      const { notes, tags, noteTags } = state;
      const { title, content, tags: newTags } = action.payload;
      const date = new Date().toISOString();

      const nextNoteId = notes.length ? Math.max(...notes.map((value) => value.id)) + 1 : 1;
      let nextTagId = tags.length ? Math.max(...tags.map((value) => value.id)) + 1 : 1;

      const updatedNotes = [
        ...notes,
        { id: nextNoteId, title, content, isArchived: false, editedAt: date, createdAt: date },
      ];
      const updatedTags = [...tags];
      const updatedNoteTags = [...noteTags];

      const tagIdByContent = new Map(tags.map((value) => [value.content, value.id]));

      for (const tagContent of newTags) {
        const tagId = tagIdByContent.has(content) ? tagIdByContent.get(content) : nextTagId;

        if (!tagIdByContent.has(content)) {
          updatedTags.push({ id: tagId!, content: tagContent });
          nextTagId++;
        }

        updatedNoteTags.push({ noteId: nextNoteId, tagId: tagId! });
      }

      return {
        notes: updatedNotes,
        tags: updatedTags,
        noteTags: updatedNoteTags,
      };
    },
    updateNote: (state, action: PayloadAction<NotePayload>) => {
      const { notes, tags, noteTags } = state;
      const { id, title, content, isArchived, tags: newTags } = action.payload;
      const date = new Date().toISOString();

      let nextTagId = tags.length ? Math.max(...tags.map((value) => value.id)) + 1 : 1;

      const updatedNotes = notes.map((value) =>
        value.id === id
          ? {
              id: id,
              title: title,
              content: content,
              isArchived: isArchived,
              editedAt: date,
              createdAt: value.createdAt,
            }
          : value,
      );
      const updatedTags = [...tags];
      const updatedNoteTags = noteTags.filter((value) => value.noteId === id);

      const tagIdByContent = new Map(tags.map((value) => [value.content, value.id]));

      for (const tagContent of newTags) {
        const tagId = tagIdByContent.has(content) ? tagIdByContent.get(content) : nextTagId;

        if (!tagIdByContent.has(content)) {
          updatedTags.push({ id: tagId!, content: tagContent });
          nextTagId++;
        }

        updatedNoteTags.push({ noteId: id, tagId: tagId! });
      }
      return {
        notes: updatedNotes,
        tags: updatedTags,
        noteTags: updatedNoteTags,
      };
    },
    deleteNote: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      return {
        ...state,
        notes: state.notes.filter((value) => value.id !== id),
        noteTags: state.noteTags.filter((value) => value.noteId !== id),
      };
    },
    setNoteArchivingStatus: (
      state,
      action: PayloadAction<Omit<Note, "createdAt" | "editedAt" | "title" | "content">>,
    ) => {
      const { id, isArchived } = action.payload;
      return {
        ...state,
        notes: state.notes.map((value) => (value.id === id ? { ...value, isArchived: isArchived } : value)),
      };
    },
  },
});

export const selectNotes = (state: RootState) => state.data.notes;
export const selectNotesById = (state: RootState, id: number) => state.data.notes.find((value) => value.id === id);
export const selectNoteTags = (state: RootState) => state.data.noteTags;
export const selectTagsById = (state: RootState, id: number) => state.data.tags.find((value) => value.id === id);
export const selectTags = (state: RootState) => state.data.tags;

export const selectAvailableNotes = createSelector(
  [selectNotes, selectNoteTags, selectFilterByTitle, selectSelectedTagId, selectSelectedNoteType],
  (notes, noteTags, filterByTitle, selectedTagId, selectedNoteType) => {
    const notesAssociatedToSelectedTag = new Set(
      noteTags.filter((value) => value.tagId === selectedTagId).map((value) => value.noteId),
    );
    const isArchived = selectedNoteType === "all-notes" ? false : true;
    const title = filterByTitle.trim().toLowerCase();
    return notes.filter(
      (value) =>
        (selectedTagId === -1 || notesAssociatedToSelectedTag.has(value.id)) &&
        value.isArchived === isArchived &&
        (!title.length || value.title.trim().toLowerCase().startsWith(title)),
    );
  },
);
export const selectSelectedNote = createSelector([selectNotes, selectSelectedNoteId], (notes, id) => {
  return notes.find((value) => value.id === id);
});
export const selectNotesByArchivingStatus = createSelector(
  [selectNotes, selectSelectedNoteType],
  (notes, selectedNoteType) => {
    const isArchived = selectedNoteType === "all-notes" ? false : true;
    return notes.filter((value) => value.isArchived === isArchived);
  },
);

export const selectTagsForSelectedNote = createSelector(
  [selectSelectedNoteId, selectTags, selectNoteTags],
  (noteId, tags, noteTags) => {
    const tagIds = new Set(noteTags.filter((value) => value.noteId === noteId).map((value) => value.tagId));
    return tags.filter((value) => tagIds.has(value.id));
  },
);
export const selectTagsByNoteId = (noteId: number) =>
  createSelector([selectTags, selectNoteTags], (tags, noteTags) => {
    const tagIds = new Set(noteTags.filter((value) => value.noteId === noteId).map((value) => value.tagId));
    return tags.filter((value) => tagIds.has(value.id));
  });
export const selectTagsForFilteredNotesByArchivingStatus = createSelector(
  [selectNotesByArchivingStatus, selectTags, selectNoteTags],
  (notes, tags, noteTags) => {
    const noteIds = new Set(notes.map((value) => value.id));
    const tagIds = new Set(noteTags.filter((value) => noteIds.has(value.noteId)).map((value) => value.tagId));
    return tags.filter((value) => tagIds.has(value.id));
  },
);

export const { addNote, updateNote, deleteNote, setNoteArchivingStatus } = dataSlice.actions;

export default dataSlice.reducer;
