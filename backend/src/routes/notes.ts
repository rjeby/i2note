import { Router } from "express";
import { createNote, createNoteTag, deleteNote, getAllNotes, getAllNoteTags, getNoteById, isNotePayloadValid, isNotePresent, isNoteTagPayloadValid, updateNote } from "../handlers/notes.ts";
import { isIdValid } from "../handlers/common.ts";

const router = Router();

router.get("/", getAllNotes);
router.post("/", isNotePayloadValid, createNote);
router.get("/:id", isIdValid, isNotePresent, getNoteById);
router.put("/:id", isIdValid, isNotePayloadValid, isNotePresent, updateNote);
router.delete("/:id", isIdValid, isNotePresent, deleteNote);

router.get("/:id/tags", isIdValid, isNotePresent, getAllNoteTags);
router.post("/:id/tags", isIdValid, isNotePresent, isNoteTagPayloadValid, createNoteTag);

export default router;
