import { Router } from "express";
import { createNote, getAllNotes } from "../handlers/notes.ts";

const router = Router();

router.get("/", getAllNotes);
router.post("/", createNote);
// router.put("/:id");
// router.delete("/:id");

export default router;
