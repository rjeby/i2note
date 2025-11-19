import { Router } from "express";
import { isIdValid } from "../handlers/common.ts";
import { createTag, deleteTag, getAllTags, getTagById, isTagPayloadValid, isTagPresentByContent, isTagPresentById, updateTag } from "../handlers/tags.ts";

const router = Router();

router.get("/", getAllTags);
router.post("/", isTagPayloadValid, isTagPresentByContent, createTag);
router.get("/:id", isIdValid, isTagPresentById, getTagById);
router.put("/:id", isIdValid, isTagPayloadValid, isTagPresentById, updateTag);
router.delete("/:id", isIdValid, isTagPresentById, deleteTag);

export default router;
