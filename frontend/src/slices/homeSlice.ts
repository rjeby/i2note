import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { Note, NoteTagAssociation, NoteType, Tag } from "../types";

import { notes, noteTags, noteTagAssociations } from "../data";

export interface HomeState {
  notes: Note[];
  noteTags: Tag[];
  noteTagAssociations: NoteTagAssociation[];
  selectedNotesType: NoteType;
  selectedNoteId: number;
  isBeingEdited: boolean;
  title: string;
  content: string;
  tag: string;
  tags: string[];
}

const initialState: HomeState = {
  notes: notes,
  noteTags: noteTags,
  noteTagAssociations: noteTagAssociations,
  selectedNotesType: "all-notes",
  selectedNoteId: -1,
  isBeingEdited: false,
  title: "",
  content: "",
  tag: "",
  tags: [],
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setSelectedNotesType: (state, action: PayloadAction<NoteType>) => {
      const validNote = state.notes.find((note) =>
        action.payload === "all-notes"
          ? !note.isArchived
          : note.isArchived,
      );

      const associatedTagIds = validNote
        ? new Set(
            state.noteTagAssociations
              .filter((association) => association.noteId === validNote.id)
              .map((association) => association.tagId),
          )
        : new Set();
      const validNoteTags = validNote
        ? noteTags
            .filter((tag) => associatedTagIds.has(tag.id))
            .map((tag) => tag.content)
        : [];
      return {
        ...state,
        selectedNotesType: action.payload,
        selectedNoteId: validNote ? validNote.id : -1,
        isBeingEdited: false,
        title: validNote ? validNote.title : "",
        content: validNote ? validNote.content : "",
        tag: "",
        tags: validNoteTags,
      };
    },
    setSelectedNoteId: (state, action: PayloadAction<number>) => {
      const note = state.notes.find((note) => note.id === action.payload);
      const associatedTagIds = new Set(
        state.noteTagAssociations
          .filter((association) => association.noteId === action.payload)
          .map((association) => association.tagId),
      );
      const noteTags = state.noteTags
        .filter((tag) => associatedTagIds.has(tag.id))
        .map((tag) => tag.content);
      return {
        ...state,
        selectedNoteId: note ? action.payload : -1,
        isBeingEdited: false,
        title: note ? note.title : "",
        content: note ? note.content : "",
        tag: "",
        tags: noteTags,
      };
    },
    setTitle: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        title: action.payload,
      };
    },
    setContent: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        content: action.payload,
      };
    },
    setTag: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        tag: action.payload,
      };
    },
    setIsBeingEdited: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isBeingEdited: action.payload,
      };
    },
    setTags: (state, action: PayloadAction<string[]>) => {
      return {
        ...state,
        tags: action.payload,
      };
    },
    addTag: (state, action: PayloadAction<string>) => {
      const newTag = action.payload.trim();
      if (newTag.length === 0 || state.tags.includes(newTag)) {
        return;
      }
      return {
        ...state,
        tags: [...state.tags, newTag],
      };
    },
    removeTag: (state, action: PayloadAction<string>) => {
      const toDelete = action.payload.trim();
      if (toDelete.length === 0 || !state.tags.includes(toDelete)) {
        return;
      }
      return {
        ...state,
        tags: state.tags.filter((tag) => tag !== toDelete),
      };
    },
    updateNote: (state) => {
      let maxTagId = Math.max(...state.noteTags.map((tag) => tag.id));
      const noteTagsSet = new Set(state.noteTags.map((tag) => tag.content));
      const noteTags = [...state.noteTags];
      const noteTagAssociations = [...state.noteTagAssociations];
      const notes = state.notes.map((note) =>
        note.id === state.selectedNoteId
          ? { ...note, title: state.title, content: state.content }
          : note,
      );
      for (const tag of state.tags) {
        if (!noteTagsSet.has(tag)) {
          const id = ++maxTagId;
          noteTags.push({ id: id, content: tag });
          noteTagAssociations.push({
            noteId: state.selectedNoteId,
            tagId: id,
          });
        }
      }

      return {
        ...state,
        isBeingEdited: false,
        notes: notes,
        noteTags: noteTags,
        noteTagAssociations: noteTagAssociations,
      };
    },
    archiveNote: (state) => {
      const notes = state.notes.map((note) =>
        note.id === state.selectedNoteId ? { ...note, isArchived: true } : note,
      );
      const nonArchivedNote = notes.find((note) => !note.isArchived);

      const associatedTagIds = nonArchivedNote
        ? new Set(
            state.noteTagAssociations
              .filter(
                (association) => association.noteId === nonArchivedNote.id,
              )
              .map((association) => association.tagId),
          )
        : new Set();
      const noteTags = nonArchivedNote
        ? state.noteTags
            .filter((tag) => associatedTagIds.has(tag.id))
            .map((tag) => tag.content)
        : [];
      return {
        ...state,
        notes: notes,
        selectedNoteId: nonArchivedNote ? nonArchivedNote.id : -1,
        isBeingEdited: false,
        title: nonArchivedNote ? nonArchivedNote.title : "",
        content: nonArchivedNote ? nonArchivedNote.content : "",
        tag: "",
        tags: noteTags,
      };
    },
    unarchiveNote: (state) => {
      const notes = state.notes.map((note) =>
        note.id === state.selectedNoteId
          ? { ...note, isArchived: false }
          : note,
      );
      const archivedNote = notes.find((note) => note.isArchived);

      const associatedTagIds = archivedNote
        ? new Set(
            state.noteTagAssociations
              .filter((association) => association.noteId === archivedNote.id)
              .map((association) => association.tagId),
          )
        : new Set();
      const noteTags = archivedNote
        ? state.noteTags
            .filter((tag) => associatedTagIds.has(tag.id))
            .map((tag) => tag.content)
        : [];
      return {
        ...state,
        notes: notes,
        selectedNoteId: archivedNote ? archivedNote.id : -1,
        isBeingEdited: false,
        title: archivedNote ? archivedNote.title : "",
        content: archivedNote ? archivedNote.content : "",
        tag: "",
        tags: noteTags,
      };
    },
    deleteNote: (state) => {
      const notes = state.notes.filter(
        (note) => note.id !== state.selectedNoteId,
      );
      const associations = state.noteTagAssociations.filter(
        (association) => association.noteId !== state.selectedNoteId,
      );
      const presentTags = new Set(
        associations.map((association) => association.tagId),
      );
      const noteTags = state.noteTags.filter((tag) => presentTags.has(tag.id));

      const validNote = notes.find((note) =>
        state.selectedNotesType === "all-notes"
          ? !note.isArchived
          : note.isArchived,
      );

      const associatedTagIds = validNote
        ? new Set(
            associations
              .filter((association) => association.noteId === validNote.id)
              .map((association) => association.tagId),
          )
        : new Set();
      const validNoteTags = validNote
        ? noteTags
            .filter((tag) => associatedTagIds.has(tag.id))
            .map((tag) => tag.content)
        : [];

      return {
        ...state,
        notes: notes,
        noteTagAssociations: associations,
        noteTags: noteTags,
        selectedNoteId: validNote ? validNote.id : -1,
        isBeingEdited: false,
        title: validNote ? validNote.title : "",
        content: validNote ? validNote.content : "",
        tag: "",
        tags: validNoteTags,
      };
    },
  },
});

export const {
  setSelectedNotesType,
  setSelectedNoteId,
  setTitle,
  setContent,
  setIsBeingEdited,
  setTag,
  addTag,
  removeTag,
  updateNote,
  archiveNote,
  unarchiveNote,
  deleteNote,
} = homeSlice.actions;
export const selectHome = (state: RootState) => state.home;
export default homeSlice.reducer;
