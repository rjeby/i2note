import type { Message } from "@/types";
import { createSlice, isAnyOf, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store";
import { addNote, archiveNote, deleteNote, getUserNotes, unArchiveNote, updateNote } from "./dataSlice";

interface ToastState {
  messages: Message[];
}

const initialState: ToastState = {
  messages: [],
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    addMessage: {
      reducer: (state, action: PayloadAction<Message>) => {
        const message = action.payload;
        return { messages: [...state.messages, message] };
      },
      prepare: (message: Omit<Message, "uuid">) => {
        const uuid = nanoid();
        return { payload: { uuid, ...message } };
      },
    },
    deleteMessage: (state, action: PayloadAction<string>) => {
      const uuid = action.payload;
      return { messages: state.messages.filter((value) => value.uuid !== uuid) };
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(
        getUserNotes.rejected,
        addNote.rejected,
        updateNote.rejected,
        deleteNote.rejected,
        archiveNote.rejected,
        unArchiveNote.rejected,
      ),
      (state, action) => {
        const message: Message = { uuid: nanoid(), content: action.error.message ?? "Unknown", type: "error" };
        return { messages: [...state.messages, message] };
      },
    );
  },
});

export const { addMessage, deleteMessage } = toastSlice.actions;

export const selectMessages = (state: RootState) => state.toast.messages;

export default toastSlice.reducer;
