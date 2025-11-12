import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { NoteType } from "../types";
import { addNote } from "./dataSlice";

interface homeState {
  selectedNoteId: number;
  selectedTagId: number;
  selectedNoteType: NoteType;
  filterByTitle: string;
  isNoteBeingCreated: boolean;
}

const initialState: homeState = {
  selectedNoteId: -1,
  selectedTagId: -1,
  selectedNoteType: "all-notes",
  filterByTitle: "",
  isNoteBeingCreated: false,
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setSelectedNoteId: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        selectedNoteId: action.payload,
      };
    },
    setSelectedTagId: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        selectedTagId: action.payload,
      };
    },
    setSelectedNoteType: (state, action: PayloadAction<NoteType>) => {
      return {
        ...state,
        selectedNoteType: action.payload,
      };
    },
    setFilterByTitle: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        filterByTitle: action.payload,
      };
    },
    setIsNoteBeingCreated: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isNoteBeingCreated: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addNote, (state) => {
      return {
        ...state,
        selectedNoteId: -1,
      };
    });
  },
});

export const selectFilterByTitle = (state: RootState) => state.home.filterByTitle;
export const selectSelectedNoteId = (state: RootState) => state.home.selectedNoteId;
export const selectSelectedTagId = (state: RootState) => state.home.selectedTagId;
export const selectSelectedNoteType = (state: RootState) => state.home.selectedNoteType;
export const selectIsNoteBeingCreated = (state: RootState) => state.home.isNoteBeingCreated;

export const { setSelectedNoteId, setSelectedTagId, setSelectedNoteType, setFilterByTitle, setIsNoteBeingCreated } =
  homeSlice.actions;

export default homeSlice.reducer;
