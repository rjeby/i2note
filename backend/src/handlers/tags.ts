import type { NextFunction, Request, Response } from "express";
import type { Tag } from "../generated/prisma/client.ts";
import db from "../db.ts";

export const getAllTags = async (req: Request, res: Response, next: NextFunction) => {
  const tags = await db.tag.findMany();
  return res.status(200).json(tags);
};

export const createTag = async (req: Request<{}, {}, { content: string }>, res: Response, next: NextFunction) => {
  const { content } = req.body;
  const tag = await db.tag.create({ data: { content: content } });
  return res.status(201).json(tag);
};

export const isTagPresentById = async (req: Request, res: Response<{}, { id: number; tag: Tag }>, next: NextFunction) => {
  const { id } = res.locals;
  const tag = await db.tag.findUnique({
    where: {
      id: id,
    },
  });
  if (!tag) {
    return res.status(404).json({ message: "Tag not found" });
  }
  res.locals.tag = tag;
  next();
};

export const isTagPayloadValid = (req: Request<{}, {}, { content: string }>, res: Response, next: NextFunction) => {
  const { content } = req.body;
  if (!content || !content.length) {
    return res.status(400).json({ message: "Invalid Tag content" });
  }
  res.locals.content = content;
  next();
};

export const isTagPresentByContent = async (req: Request, res: Response<{}, { content: string }>, next: NextFunction) => {
  const { content } = res.locals;
  const tag = await db.tag.findUnique({
    where: {
      content: content,
    },
  });

  if (tag) {
    return res.status(409).json({ message: "Tag with this content already exists" });
  }
  next();
};

export const getTagById = async (req: Request, res: Response<{}, { tag: Tag }>, next: NextFunction) => {
  const { tag } = res.locals;
  return res.status(201).json(tag);
};

export const updateTag = async (req: Request<{}, {}, { content: string }>, res: Response<{}, { id: number }>) => {
  const { id } = res.locals;
  const { content } = req.body;
  const tag = await db.tag.update({ where: { id: id }, data: { content: content } });
  return res.status(200).json(tag);
};

export const deleteTag = async (req: Request, res: Response<{}, { id: number }>) => {
  const { id } = res.locals;
  const tag = await db.tag.delete({
    where: {
      id: id,
    },
  });
  return res.status(200).json(tag);
};
