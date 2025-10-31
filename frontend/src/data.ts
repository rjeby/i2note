import type { Note } from "./types";

export const noteTags = [
  { id: 1, content: "work" },
  { id: 2, content: "personal" },
  { id: 3, content: "shopping" },
  { id: 4, content: "health" },
  { id: 5, content: "study" },
  { id: 6, content: "ideas" },
  { id: 7, content: "travel" },
  { id: 8, content: "food" },
  { id: 9, content: "productivity" },
  { id: 10, content: "finance" },
  { id: 11, content: "tech" },
  { id: 12, content: "books" },
  { id: 13, content: "fitness" },
  { id: 14, content: "goals" },
  { id: 15, content: "projects" },
  { id: 16, content: "recipes" },
  { id: 17, content: "self-improvement" },
  { id: 18, content: "planning" },
  { id: 19, content: "meditation" },
  { id: 20, content: "coding" }
];

export const noteTagAssociations = [
  { noteId: 1, tagId: 1 },  // Meeting with Client - work
  { noteId: 1, tagId: 15 }, // Meeting with Client - projects
  { noteId: 1, tagId: 18 }, // Meeting with Client - planning
  
  { noteId: 2, tagId: 3 },  // Grocery List - shopping
  { noteId: 2, tagId: 8 },  // Grocery List - food
  
  { noteId: 3, tagId: 4 },  // Workout Plan - health
  { noteId: 3, tagId: 13 }, // Workout Plan - fitness
  { noteId: 3, tagId: 18 }, // Workout Plan - planning
  
  { noteId: 4, tagId: 6 },  // Book Ideas - ideas
  { noteId: 4, tagId: 12 }, // Book Ideas - books
  { noteId: 4, tagId: 11 }, // Book Ideas - tech
  
  { noteId: 5, tagId: 8 },  // Recipe - food
  { noteId: 5, tagId: 16 }, // Recipe - recipes
  
  { noteId: 6, tagId: 10 }, // Budget Planning - finance
  { noteId: 6, tagId: 18 }, // Budget Planning - planning
  { noteId: 6, tagId: 2 },  // Budget Planning - personal
  
  { noteId: 7, tagId: 1 },  // Conference Notes - work
  { noteId: 7, tagId: 11 }, // Conference Notes - tech
  { noteId: 7, tagId: 5 },  // Conference Notes - study
  
  { noteId: 8, tagId: 7 },  // Vacation Plan - travel
  { noteId: 8, tagId: 18 }, // Vacation Plan - planning
  { noteId: 8, tagId: 2 },  // Vacation Plan - personal
  
  { noteId: 9, tagId: 5 },  // Learning Goals - study
  { noteId: 9, tagId: 14 }, // Learning Goals - goals
  { noteId: 9, tagId: 20 }, // Learning Goals - coding
  
  { noteId: 10, tagId: 1 }, // Project Tasks - work
  { noteId: 10, tagId: 15 }, // Project Tasks - projects
  { noteId: 10, tagId: 20 }, // Project Tasks - coding
  
  { noteId: 11, tagId: 2 },  // Birthday Gift Ideas - personal
  { noteId: 11, tagId: 3 },  // Birthday Gift Ideas - shopping
  
  { noteId: 12, tagId: 5 },  // Study Notes - study
  { noteId: 12, tagId: 20 }, // Study Notes - coding
  { noteId: 12, tagId: 11 }, // Study Notes - tech
  
  { noteId: 13, tagId: 9 },  // Todo Weekend - productivity
  { noteId: 13, tagId: 2 },  // Todo Weekend - personal
  { noteId: 13, tagId: 12 }, // Todo Weekend - books
  
  { noteId: 14, tagId: 17 }, // Quote Collection - self-improvement
  { noteId: 14, tagId: 6 },  // Quote Collection - ideas
  
  { noteId: 15, tagId: 11 }, // App Feature Ideas - tech
  { noteId: 15, tagId: 6 },  // App Feature Ideas - ideas
  { noteId: 15, tagId: 15 }, // App Feature Ideas - projects
  
  { noteId: 16, tagId: 7 },  // Travel Checklist - travel
  { noteId: 16, tagId: 18 }, // Travel Checklist - planning
  
  { noteId: 17, tagId: 1 },  // Work Notes - work
  { noteId: 17, tagId: 15 }, // Work Notes - projects
  { noteId: 17, tagId: 9 },  // Work Notes - productivity
  
  { noteId: 18, tagId: 19 }, // Meditation Journal - meditation
  { noteId: 18, tagId: 17 }, // Meditation Journal - self-improvement
  { noteId: 18, tagId: 4 },  // Meditation Journal - health
  
  { noteId: 19, tagId: 3 },  // Shopping List - shopping
  { noteId: 19, tagId: 2 },  // Shopping List - personal
  
  { noteId: 20, tagId: 14 }, // Future Goals - goals
  { noteId: 20, tagId: 17 }, // Future Goals - self-improvement
  { noteId: 20, tagId: 20 }  // Future Goals - coding
];

export const notes: Note[] = [
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
