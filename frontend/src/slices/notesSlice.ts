import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface Note {
  id: number;
  title: string;
  content: string;
  isArchived: boolean;
  createdAt: string;
  editedAt: string;
}

export interface NotesState {
  notes: Note[];
  createdNote: Note;
  selectedNoteId: number;
  content: string;
  editedContent: string;
  title: string;
  editedTitle: string;
  isBeingEdited: boolean;
  isNoteBeingCreated: boolean;
}

const notes: Note[] = [
  {
    id: 1,
    title: "Meeting with Client",
    content: "Discuss project requirements and finalize milestones.",
    createdAt: "2025-09-12T10:15:00Z",
    editedAt: "2025-09-12T10:45:00Z",
    isArchived: false,
  },
  {
    id: 2,
    title: "Grocery List",
    content: "Milk, Eggs, Bread, Coffee, Apples, Cheese",
    createdAt: "2025-09-14T08:30:00Z",
    editedAt: "2025-09-14T09:00:00Z",
    isArchived: false,
  },
  {
    id: 3,
    title: "Workout Plan",
    content:
      "Monday - Chest, Tuesday - Back, Wednesday - Legs, Thursday - Arms, Friday - Cardio",
    createdAt: "2025-09-15T06:00:00Z",
    editedAt: "2025-09-15T06:05:00Z",
    isArchived: false,
  },
  {
    id: 4,
    title: "Book Ideas",
    content: "Sci-fi story about AI consciousness and human ethics.",
    createdAt: "2025-09-16T20:20:00Z",
    editedAt: "2025-09-17T09:00:00Z",
    isArchived: false,
  },
  {
    id: 5,
    title: "Recipe - Pasta Carbonara",
    content: "Ingredients: spaghetti, eggs, pancetta, parmesan, pepper.",
    createdAt: "2025-09-18T12:00:00Z",
    editedAt: "2025-09-18T12:15:00Z",
    isArchived: false,
  },
  {
    id: 6,
    title: "Budget Planning",
    content: "Rent: $1200, Utilities: $200, Groceries: $400, Savings: $500",
    createdAt: "2025-09-19T15:30:00Z",
    editedAt: "2025-09-19T15:45:00Z",
    isArchived: false,
  },
  {
    id: 7,
    title: "Conference Notes",
    content: "Keynote on AI trends and responsible data use.",
    createdAt: "2025-09-20T09:00:00Z",
    editedAt: "2025-09-20T09:30:00Z",
    isArchived: false,
  },
  {
    id: 8,
    title: "Vacation Plan",
    content: "Visit Tokyo, Kyoto, and Osaka. Try sushi, temples, and shopping.",
    createdAt: "2025-09-22T14:00:00Z",
    editedAt: "2025-09-23T08:00:00Z",
    isArchived: false,
  },
  {
    id: 9,
    title: "Learning Goals",
    content: "Master React hooks, improve TypeScript skills, learn D3.js.",
    createdAt: "2025-09-23T10:00:00Z",
    editedAt: "2025-09-23T10:20:00Z",
    isArchived: false,
  },
  {
    id: 10,
    title: "Project Tasks",
    content: "Finish API integration, fix UI bugs, deploy to staging.",
    createdAt: "2025-09-25T16:30:00Z",
    editedAt: "2025-09-25T17:00:00Z",
    isArchived: false,
  },
  {
    id: 11,
    title: "Birthday Gift Ideas",
    content: "Wireless headphones, coffee grinder, sketchbook.",
    createdAt: "2025-09-26T09:45:00Z",
    editedAt: "2025-09-26T10:10:00Z",
    isArchived: false,
  },
  {
    id: 12,
    title: "Study Notes - JavaScript",
    content: "Closures, async/await, prototypes, event loop.",
    createdAt: "2025-09-27T19:00:00Z",
    editedAt: "2025-09-27T19:05:00Z",
    isArchived: false,
  },
  {
    id: 13,
    title: "Todo - Weekend",
    content: "Laundry, clean kitchen, finish reading 'Atomic Habits'.",
    createdAt: "2025-09-28T11:30:00Z",
    editedAt: "2025-09-28T12:00:00Z",
    isArchived: false,
  },
  {
    id: 14,
    title: "Quote Collection",
    content: '"Simplicity is the soul of efficiency." – Austin Freeman',
    createdAt: "2025-09-29T13:00:00Z",
    editedAt: "2025-09-29T13:10:00Z",
    isArchived: false,
  },
  {
    id: 15,
    title: "App Feature Ideas",
    content: "Dark mode toggle, markdown support, offline sync.",
    createdAt: "2025-09-30T15:00:00Z",
    editedAt: "2025-09-30T15:20:00Z",
    isArchived: false,
  },
  {
    id: 16,
    title: "Travel Checklist",
    content: "Passport, charger, adapter, camera, tickets.",
    createdAt: "2025-10-01T09:00:00Z",
    editedAt: "2025-10-01T09:05:00Z",
    isArchived: false,
  },
  {
    id: 17,
    title: "Work Notes",
    content: "Review PRs, update documentation, plan next sprint.",
    createdAt: "2025-10-02T14:00:00Z",
    editedAt: "2025-10-02T14:30:00Z",
    isArchived: false,
  },
  {
    id: 18,
    title: "Meditation Journal",
    content: "Felt calm and focused today. Practiced for 20 minutes.",
    createdAt: "2025-10-03T07:30:00Z",
    editedAt: "2025-10-03T08:00:00Z",
    isArchived: false,
  },
  {
    id: 19,
    title: "Shopping List",
    content: "T-shirt, jeans, sneakers, jacket.",
    createdAt: "2025-10-04T10:00:00Z",
    editedAt: "2025-10-04T10:20:00Z",
    isArchived: false,
  },
  {
    id: 20,
    title: "Future Goals",
    content: "Start a blog, learn Rust, travel more, stay healthy.",
    createdAt: "2025-10-05T18:00:00Z",
    editedAt: "2025-10-05T18:15:00Z",
    isArchived: false,
  },
];

const initialState: NotesState = {
  notes: notes,
  createdNote: {
    id: -1,
    title: "",
    content: "",
    createdAt: "",
    editedAt: "",
    isArchived: false,
  },
  selectedNoteId: 1,
  content: "",
  editedContent: "",
  title: "",
  editedTitle: "",
  isBeingEdited: false,
  isNoteBeingCreated: false,
};
const getDate = () => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = new Date();
  return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
};

const getNewNoteId = (notes) => {
  let maxId = -1;
  for (const note of notes) {
    maxId = Math.max(maxId, note.id);
  }
  return maxId + 1;
};

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      return {
        ...state,
        notes: [
          ...state.notes,
          {
            ...action.payload,
            id: getNewNoteId(state.notes),
            createdAt: getDate(),
            editedAt: getDate(),
          },
        ],
      };
    },
    updateNoteById: (state, action: PayloadAction<Note>) => {
      const updatedNotes = state.notes.map((note) =>
        note.id !== action.payload.id
          ? note
          : {
              ...note,
              content: action.payload.content,
              title: action.payload.title,
            },
      );

      return { ...state, notes: updatedNotes };
    },
    deleteNoteById: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.payload),
      };
    },
    archiveNoteById: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id !== action.payload ? note : { ...note, isArchived: true },
        ),
      };
    },
    getValidNoteId: (state) => {
      const note = state.notes.length ? state.notes[0] : null;
      return {
        ...state,
        selectedNoteId: note ? note.id : -1,
        content: note ? note.content : "",
        editedContent: note ? note.content : "",
        title: note ? note.title : "",
        editedTitle: note ? note.title : "",
      };
    },
    updateSelectedNoteId: (state, action: PayloadAction<number>) => {
      const note = state.notes.find((note) => note.id === action.payload);
      return {
        ...state,
        selectedNoteId: action.payload,
        content: note ? note.content : "",
        editedContent: note ? note.content : "",
        title: note ? note.title : "",
        editedTitle: note ? note.title : "",
      };
    },
    updateContent: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        content: action.payload,
      };
    },
    updateEditedContent: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        editedContent: action.payload,
      };
    },
    updateTitle: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        title: action.payload,
      };
    },
    updateEditedTitle: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        editedTitle: action.payload,
      };
    },
    updateIsBeignEdited: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isBeingEdited: action.payload,
      };
    },
    updateIsNoteBeingCreated: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isNoteBeingCreated: action.payload,
      };
    },
    updateCreatedNote: (state, action: PayloadAction<Note>) => {
      return {
        ...state,
        createdNote: action.payload,
      };
    },
  },
});

export const {
  addNote,
  updateNoteById,
  updateSelectedNoteId,
  updateContent,
  updateEditedContent,
  updateIsBeignEdited,
  deleteNoteById,
  getValidNoteId,
  updateTitle,
  updateEditedTitle,
  updateIsNoteBeingCreated,
  updateCreatedNote,
} = notesSlice.actions;
export const selectNotes = (state: RootState) => state.notes;
export default notesSlice.reducer;
