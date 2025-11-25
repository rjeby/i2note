import { Router } from "express";
import { isIdValid } from "../handlers/common.ts";
import { archiveNote, createNote, deleteNote, getAllUserNotes, isNotePayloadValid, isNotePresentAndAccessibleByUser, unarchiveNote, updateNote } from "../handlers/notes.ts";
import { isTokenValid } from "../handlers/auth.ts";

const router = Router();

router.get("/", isTokenValid, getAllUserNotes);
router.post("/", isTokenValid, isNotePayloadValid, createNote);
router.patch("/:id", isIdValid, isTokenValid, isNotePayloadValid, isNotePresentAndAccessibleByUser, updateNote);
router.put("/:id/archive", isIdValid, isTokenValid, isNotePresentAndAccessibleByUser, archiveNote);
router.put("/:id/unarchive", isIdValid, isTokenValid, isNotePresentAndAccessibleByUser, unarchiveNote);
router.delete("/:id", isIdValid, isTokenValid, isNotePresentAndAccessibleByUser, deleteNote);

export default router;
