import { Router } from "express";
import { isIdValid } from "../handlers/common.ts";
import { createTag, deleteTag, getAllTags, getTagById, isContentValid, isTagPresent, updateTag } from "../handlers/tags.ts";

const router = Router();

router.get("/", getAllTags);
router.post("/", isContentValid, createTag);
router.get("/:id", isIdValid, isTagPresent, getTagById);
router.put("/:id", isIdValid, isTagPresent, isContentValid, updateTag);
router.delete("/:id", isIdValid, isTagPresent, deleteTag);

export default router;
