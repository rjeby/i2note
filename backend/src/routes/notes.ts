import { Router } from "express";
import { createNote, deleteNote, getAllNotes, getNoteById, isIdValid, updateNote } from "../handlers/notes.ts";

const router = Router();

router.get("/", getAllNotes);
router.post("/", createNote);
router.get("/:id", isIdValid, getNoteById);
router.put("/:id", isIdValid, updateNote);
router.delete("/:id", isIdValid, deleteNote);

export default router;
