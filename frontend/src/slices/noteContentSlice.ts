import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface NoteContentSlice {
  isBeingEdited: boolean;
  title: string;
  content: string;
  tag: string;
  tags: string[];
}

const initialState: NoteContentSlice = {
  isBeingEdited: false,
  title: "",
  content: "",
  tag: "",
  tags: [],
};

export const noteContentSlice = createSlice({
  name: "noteContent",
  initialState,
  reducers: {
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
  },
});

export const {
  setTitle,
  setContent,
  setTag,
  setIsBeingEdited,
  addTag,
  removeTag,
} = noteContentSlice.actions;
export const selectNoteContent = noteContentSlice.actions;
export default noteContentSlice.reducer;
