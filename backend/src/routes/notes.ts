import { Router } from "express";
import { isIdValid } from "../handlers/common.ts";
import { archiveNote, createNote, deleteNote, getAllNotes, isNotePayloadValid, isNotePresent, unarchiveNote, updateNote } from "../handlers/notes.ts";

const router = Router();

router.get("/", getAllNotes);
router.post("/", isNotePayloadValid, createNote);
router.patch("/:id", isIdValid, isNotePayloadValid, isNotePresent, updateNote);
router.put("/:id/archive", isIdValid, isNotePresent, archiveNote);
router.put("/:id/unarchive", isIdValid, isNotePresent, unarchiveNote);
router.delete("/:id", isIdValid, isNotePresent, deleteNote);

export default router;
