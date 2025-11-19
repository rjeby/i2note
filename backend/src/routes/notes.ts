import { Router } from "express";
import { createNote, deleteNote, getAllNotes, getNoteById, isNotePresent, updateNote } from "../handlers/notes.ts";
import { isIdValid } from "../handlers/common.ts";

const router = Router();

router.get("/", getAllNotes);
router.post("/", createNote);
router.get("/:id", isIdValid, isNotePresent, getNoteById);
router.put("/:id", isIdValid, isNotePresent, updateNote);
router.delete("/:id", isIdValid, isNotePresent, deleteNote);

export default router;
