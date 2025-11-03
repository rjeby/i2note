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
  selectedTagId: number;
  isBeingEdited: boolean;
  title: string;
  content: string;
  tag: string;
  tags: string[];
  filterByTitle: string;
}

const initialState: HomeState = {
  notes: notes,
  noteTags: noteTags,
  noteTagAssociations: noteTagAssociations,
  selectedNotesType: "all-notes",
  selectedNoteId: -1,
  selectedTagId: -1,
  isBeingEdited: false,
  title: "",
  content: "",
  tag: "",
  tags: [],
  filterByTitle: "",
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setFilterByTitle: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        filterByTitle: action.payload,
        selectedTagId: -1,
        selectedNoteId: -1,
      };
    },
    setSelectedNotesType: (state, action: PayloadAction<NoteType>) => {
      return {
        ...state,
        selectedNotesType: action.payload,
        selectedTagId: -1,
        selectedNoteId: -1,
      };
    },
    setSlectedTagId: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        selectedTagId:
          state.selectedTagId === action.payload ? -1 : action.payload,
        selectedNoteId: -1,
      };
    },
    setSelectedNoteId: (state, action: PayloadAction<number>) => {
      const note =
        state.selectedNoteId !== action.payload
          ? state.notes.find((note) => note.id === action.payload)
          : null;
      const associatedTagIds =
        state.selectedNoteId !== action.payload
          ? new Set(
              state.noteTagAssociations
                .filter((association) => association.noteId === action.payload)
                .map((association) => association.tagId),
            )
          : new Set();
      const noteTags =
        state.selectedNoteId !== action.payload
          ? state.noteTags
              .filter((tag) => associatedTagIds.has(tag.id))
              .map((tag) => tag.content)
          : [];
      return {
        ...state,
        selectedTagId: -1,
        selectedNoteId: note ? action.payload : -1,
        isBeingEdited: false,
        title: note ? note.title : "",
        content: note ? note.content : "",
        tag: "",
        tags: noteTags,
        filterByTitle: "",
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
    cancelEditing: (state) => {
      const note = state.notes.find((note) => note.id === state.selectedNoteId);
      const associatedTagIds = note
        ? new Set(
            state.noteTagAssociations
              .filter((association) => association.noteId === note.id)
              .map((association) => association.tagId),
          )
        : new Set();
      const noteTags = note
        ? state.noteTags
            .filter((tag) => associatedTagIds.has(tag.id))
            .map((tag) => tag.content)
        : [];
      return {
        ...state,
        isBeingEdited: false,
        title: note ? note.title : "",
        content: note ? note.content : "",
        tags: noteTags,
        tag: "",
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
        tag: "",
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
        tag: "",
        tags: state.tags.filter((tag) => tag !== toDelete),
      };
    },
    updateNote: (state) => {
      let maxTagId = Math.max(...state.noteTags.map((tag) => tag.id));
      const tags = new Set(state.tags);
      const currentNoteTagIds = new Set(
        state.noteTagAssociations
          .filter((association) => association.noteId === state.selectedNoteId)
          .map((association) => association.tagId),
      );
      const currentNoteTagsContent = new Set(
        state.noteTags
          .filter((tag) => currentNoteTagIds.has(tag.id))
          .map((tag) => tag.content),
      );
      const toDeleteTagIds = new Set(
        state.noteTags
          .filter(
            (tag) => currentNoteTagIds.has(tag.id) && !tags.has(tag.content),
          )
          .map((tag) => tag.id),
      );

      const noteTagAssociations = state.noteTagAssociations.filter(
        (association) =>
          !(
            association.noteId === state.selectedNoteId &&
            toDeleteTagIds.has(association.tagId)
          ),
      );

      const associatedTagIds = new Set(
        state.noteTagAssociations.map((association) => association.tagId),
      );
      const noteTags = state.noteTags.filter((tag) =>
        associatedTagIds.has(tag.id),
      );
      const notes = state.notes.map((note) =>
        note.id === state.selectedNoteId
          ? { ...note, title: state.title, content: state.content }
          : note,
      );
      for (const tag of state.tags) {
        if (!currentNoteTagsContent.has(tag)) {
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
    setNoteIsArchived: (state, action: PayloadAction<boolean>) => {
      const notes = state.notes.map((note) =>
        note.id === state.selectedNoteId
          ? { ...note, isArchived: action.payload }
          : note,
      );

      return {
        ...state,
        notes: notes,
        selectedNoteId: -1,
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
        selectedNoteId: -1,
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
  setNoteIsArchived,
  deleteNote,
  cancelEditing,
  setSlectedTagId,
  setFilterByTitle,
} = homeSlice.actions;
export const selectHome = (state: RootState) => state.home;
export default homeSlice.reducer;
