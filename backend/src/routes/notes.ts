import { Router } from "express";
import { isIdValid } from "../handlers/common.ts";
import { createNote, isNoteCreationPayloadValid } from "../handlers/notes.ts";

const router = Router();

// router.get("/", getAllNotes);
// router.post("/", isNotePayloadValid, createNote);
// router.get("/:id", isIdValid, isNotePresent, getNoteById);
// router.put("/:id", isIdValid, isNotePayloadValid, isNotePresent, updateNote);
// router.delete("/:id", isIdValid, isNotePresent, deleteNote);

// router.get("/:id/tags", isIdValid, isNotePresent, getAllNoteTags);
// router.post("/:id/tags", isIdValid, isNotePresent, isNoteTagPayloadValid, createNoteTag);

router.post("/", isNoteCreationPayloadValid, createNote);

export default router;
