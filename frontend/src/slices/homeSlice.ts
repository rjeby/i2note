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
      return {
        ...state,
        selectedNotesType: action.payload,
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
        selectedNoteId: action.payload,
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
      return {
        ...state,
        notes: notes.map((note) =>
          note.id === state.selectedNoteId
            ? { ...note, isArchived: true }
            : note,
        ),
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

      return {
        ...state,
        notes: notes,
        noteTagAssociations: associations,
        noteTags: noteTags,
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
  deleteNote,
} = homeSlice.actions;
export const selectHome = (state: RootState) => state.home;
export default homeSlice.reducer;
