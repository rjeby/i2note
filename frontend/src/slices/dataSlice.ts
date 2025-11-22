import type { Note, NoteTag, Tag } from "../types";
import { createAsyncThunk, createSelector, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { selectFilterByTitle, selectSelectedNoteId, selectSelectedNoteType, selectSelectedTagId } from "./homeSlice";

const baseURI = "http://localhost:3000";

type NoteCreationPayload = Omit<Note, "id" | "createdAt" | "tags"> & {
  tags: string[];
};
type NoteCreationResponse = Note & { tags: Tag[] };
type ResponseError = { message: string };

type NotePayload = Note & { tags: string[] };

interface DataState {
  notes: Note[];
  tags: Tag[];
  noteTags: NoteTag[];
  addNoteRequest: {
    status: "idle" | "pending" | "succeeded" | "failed";
    error: string | null;
  };
  deleteNoteRequest: {
    status: "idle" | "pending" | "succeeded" | "failed";
    error: string | null;
  };
}

const initialState: DataState = {
  notes: [],
  tags: [],
  noteTags: [],
  addNoteRequest: {
    status: "idle",
    error: null,
  },
  deleteNoteRequest: {
    status: "idle",
    error: "null",
  },
};
export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
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
              updatedAt: date,
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
        ...state,
        notes: updatedNotes,
        tags: updatedTags,
        noteTags: updatedNoteTags,
      };
    },
    setNoteArchivingStatus: (
      state,
      action: PayloadAction<Omit<Note, "createdAt" | "updatedAt" | "title" | "content">>,
    ) => {
      const { id, isArchived } = action.payload;
      return {
        ...state,
        notes: state.notes.map((value) => (value.id === id ? { ...value, isArchived: isArchived } : value)),
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addNote.fulfilled, (state, action) => {
        const note = {
          id: action.payload.id,
          title: action.payload.title,
          content: action.payload.content,
          isArchived: action.payload.isArchived,
          updatedAt: action.payload.updatedAt,
          createdAt: action.payload.createdAt,
        };
        const tags = action.payload.tags;
        const updatedNotes = [...state.notes, note];
        const updatedTags = [...state.tags];
        const updatedNoteTags = [...state.noteTags];
        const currentTagIds = new Set(state.tags.map((value) => value.id));
        for (const tag of tags) {
          if (!currentTagIds.has(tag.id)) {
            updatedTags.push(tag);
          }
          updatedNoteTags.push({ noteId: note.id, tagId: tag.id });
        }
        return {
          ...state,
          notes: updatedNotes,
          tags: updatedTags,
          noteTags: updatedNoteTags,
          addNoteRequest: {
            ...state.addNoteRequest,
            status: "succeeded",
          },
        };
      })
      .addCase(addNote.pending, (state) => {
        state.addNoteRequest.status = "pending";
      })
      .addCase(addNote.rejected, (state, action) => {
        state.addNoteRequest.status = "failed";
        state.addNoteRequest.error = action.error.message ?? "Unknown Error";
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        const note = action.payload;
        const updatedNotes = state.notes.filter((value) => value.id !== note.id);
        const updatedNoteTags = state.noteTags.filter((value) => value.noteId !== note.id);
        return {
          ...state,
          notes: updatedNotes,
          noteTags: updatedNoteTags,
        };
      })
      .addCase(deleteNote.pending, (state) => {
        state.deleteNoteRequest.status = "pending";
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.deleteNoteRequest.status = "failed";
        state.deleteNoteRequest.error = action.error.message ?? "Unknow Error";
      });
  },
});

export const addNote = createAsyncThunk<NoteCreationResponse, NoteCreationPayload>("notes/addNote", async (payload) => {
  const response = await fetch(`${baseURI}/api/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (!response.ok) {
    throw Error((data as ResponseError).message);
  }
  return data as NoteCreationResponse;
});

export const deleteNote = createAsyncThunk<Note, number>("notes/deleteNote", async (id) => {
  const response = await fetch(`${baseURI}/api/notes/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error((data as ResponseError).message);
  }

  return data as Note;
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

export const { updateNote, setNoteArchivingStatus } = dataSlice.actions;

export default dataSlice.reducer;
