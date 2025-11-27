import type { RequestState, ResponseError, Note, NoteTag, Tag } from "@/types";
import type { RootState } from "@/store";
import {
  selectFilterByTitle,
  selectSelectedNoteId,
  selectSelectedNoteType,
  selectSelectedTagId,
} from "@/slices/homeSlice";
import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";

const baseURI = "http://localhost:3000";

type NoteFetchElement = Note & { tags: Tag[] };

type NoteCreationPayload = Omit<Note, "id" | "createdAt" | "updatedAt" | "isArchived"> & {
  token: string;
  tags: string[];
};
type NoteUpdatePayload = Omit<Note, "createdAt" | "updatedAt" | "isArchived"> & {
  token: string;
  tags: string[];
};
type NoteCreationResponse = Note & { tags: Tag[] };
type NoteUpdateResponse = Note & { tags: Tag[] };

type NoteOperationPayload = { id: number; token: string };

type NoteFetchResponse = NoteFetchElement[];

interface DataState {
  notes: Note[];
  tags: Tag[];
  noteTags: NoteTag[];
  getUserNotesRequest: RequestState;
  addNoteRequest: RequestState;
  updateNoteRequest: RequestState;
  deleteNoteRequest: RequestState;
  archiveNoteRequest: RequestState;
  unArchiveNoteRequest: RequestState;
}

const initialState: DataState = {
  notes: [],
  tags: [],
  noteTags: [],
  getUserNotesRequest: {
    status: "idle",
    error: null,
  },
  addNoteRequest: {
    status: "idle",
    error: null,
  },
  updateNoteRequest: {
    status: "idle",
    error: null,
  },
  deleteNoteRequest: {
    status: "idle",
    error: "null",
  },
  archiveNoteRequest: {
    status: "idle",
    error: "null",
  },
  unArchiveNoteRequest: {
    status: "idle",
    error: "null",
  },
};
export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
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
          deleteNoteRequest: {
            ...state.deleteNoteRequest,
            status: "succeeded",
          },
        };
      })
      .addCase(deleteNote.pending, (state) => {
        state.deleteNoteRequest.status = "pending";
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.deleteNoteRequest.status = "failed";
        state.deleteNoteRequest.error = action.error.message ?? "Unknown Error";
      })
      .addCase(archiveNote.fulfilled, (state, action) => {
        const note = action.payload;
        const updatedNotes = state.notes.map((value) => (value.id !== note.id ? value : note));
        return {
          ...state,
          notes: updatedNotes,
          archiveNoteRequest: {
            ...state.addNoteRequest,
            status: "succeeded",
          },
        };
      })
      .addCase(archiveNote.pending, (state) => {
        state.archiveNoteRequest.status = "pending";
      })
      .addCase(archiveNote.rejected, (state, action) => {
        state.archiveNoteRequest.status = "failed";
        state.archiveNoteRequest.error = action.error.message ?? "Unknown Error";
      })
      .addCase(unArchiveNote.fulfilled, (state, action) => {
        const note = action.payload;
        const updatedNotes = state.notes.map((value) => (value.id !== note.id ? value : note));
        return {
          ...state,
          notes: updatedNotes,
          unArchiveNoteRequest: {
            ...state.unArchiveNoteRequest,
            status: "succeeded",
          },
        };
      })
      .addCase(unArchiveNote.pending, (state) => {
        state.unArchiveNoteRequest.status = "pending";
      })
      .addCase(unArchiveNote.rejected, (state, action) => {
        state.unArchiveNoteRequest.status = "failed";
        state.unArchiveNoteRequest.error = action.error.message ?? "Unknown Error";
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        const note = {
          id: action.payload.id,
          title: action.payload.title,
          content: action.payload.content,
          isArchived: action.payload.isArchived,
          updatedAt: action.payload.updatedAt,
          createdAt: action.payload.createdAt,
        };
        const tags = action.payload.tags;
        const updatedNotes = state.notes.map((value) => (value.id !== note.id ? value : note));
        const updatedTags = [...state.tags];
        const updatedNoteTags = state.noteTags.filter((value) => value.noteId !== note.id);
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
          updateNoteRequest: {
            ...state.updateNoteRequest,
            status: "succeeded",
          },
        };
      })
      .addCase(updateNote.pending, (state) => {
        state.updateNoteRequest.status = "pending";
      })
      .addCase(updateNote.rejected, (state, action) => {
        state.updateNoteRequest.status = "failed";
        state.updateNoteRequest.error = action.error.message ?? "Unknown Error";
      })
      .addCase(getUserNotes.fulfilled, (state, action) => {
        const notes: Note[] = [];
        const tags: Tag[] = [];
        const noteTags: NoteTag[] = [];
        const tagIds = new Set();
        const data = action.payload;
        for (const item of data) {
          notes.push({
            id: item.id,
            content: item.content,
            title: item.title,
            isArchived: item.isArchived,
            updatedAt: item.updatedAt,
            createdAt: item.createdAt,
          });
          for (const tag of item.tags) {
            if (!tagIds.has(tag.id)) {
              tags.push({ id: tag.id, content: tag.content });
              noteTags.push({ noteId: item.id, tagId: tag.id });
              tagIds.add(tag.id);
            }
          }
        }
        return {
          ...state,
          notes: notes,
          tags: tags,
          noteTags: noteTags,
          getUserNotesRequest: {
            ...state.getUserNotesRequest,
            status: "succeeded",
          },
        };
      })
      .addCase(getUserNotes.pending, (state) => {
        state.getUserNotesRequest.status = "pending";
      })
      .addCase(getUserNotes.rejected, (state, action) => {
        state.getUserNotesRequest.status = "failed";
        state.getUserNotesRequest.error = action.error.message ?? "Unknown Error";
      });
  },
});

export const getUserNotes = createAsyncThunk<NoteFetchResponse, string>("notes/getUserNotes", async (token: string) => {
  const response = await fetch(`${baseURI}/api/notes`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error((data as ResponseError).message);
  }
  return data;
});

export const addNote = createAsyncThunk<NoteCreationResponse, NoteCreationPayload>("notes/addNote", async (payload) => {
  const { token } = payload;
  const response = await fetch(`${baseURI}/api/notes`, {
    method: "POST",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error((data as ResponseError).message);
  }
  return data as NoteCreationResponse;
});

export const deleteNote = createAsyncThunk<Note, NoteOperationPayload>("notes/deleteNote", async (payload) => {
  const { id, token } = payload;
  const response = await fetch(`${baseURI}/api/notes/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: token,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error((data as ResponseError).message);
  }

  return data as Note;
});

export const archiveNote = createAsyncThunk<Note, NoteOperationPayload>("data/archiveNote", async (payload) => {
  const { id, token } = payload;
  const response = await fetch(`${baseURI}/api/notes/${id}/archive`, {
    method: "PUT",
    headers: {
      Authorization: token,
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error((data as ResponseError).message);
  }
  return data;
});

export const unArchiveNote = createAsyncThunk<Note, NoteOperationPayload>("data/unArchiveNote", async (payload) => {
  const { id, token } = payload;
  const response = await fetch(`${baseURI}/api/notes/${id}/unarchive`, {
    method: "PUT",
    headers: {
      Authorization: token,
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error((data as ResponseError).message);
  }
  return data;
});

export const updateNote = createAsyncThunk<NoteUpdateResponse, NoteUpdatePayload>(
  "data/updateNote",
  async (payload) => {
    const { token } = payload;
    const response = await fetch(`${baseURI}/api/notes/${payload.id}`, {
      method: "PATCH",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error((data as ResponseError).message);
    }
    return data as NoteUpdateResponse;
  },
);

export const selectNotes = (state: RootState) => state.data.notes;
export const selectNotesById = (state: RootState, id: number) => state.data.notes.find((value) => value.id === id);
export const selectNoteTags = (state: RootState) => state.data.noteTags;
export const selectTagsById = (state: RootState, id: number) => state.data.tags.find((value) => value.id === id);
export const selectTags = (state: RootState) => state.data.tags;
export const selectIsAddNotePending = (state: RootState) => state.data.addNoteRequest.status === "pending";
export const selectIsUpdateNotePending = (state: RootState) => state.data.updateNoteRequest.status === "pending";
export const selectIsDeleteNotePending = (state: RootState) => state.data.deleteNoteRequest.status === "pending";
export const selectIsArchiveNotePending = (state: RootState) => state.data.archiveNoteRequest.status === "pending";
export const selectIsUnArchiveNotePending = (state: RootState) => state.data.unArchiveNoteRequest.status === "pending";

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

export default dataSlice.reducer;
