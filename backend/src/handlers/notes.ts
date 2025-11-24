import type { NextFunction, Request, Response } from "express";
import db from "../db.ts";

interface NotePayload {
  title: string;
  content: string;
  tags: string[];
}

export const getAllNotes = async (req: Request, res: Response) => {
  const notes = await db.note.findMany({
    include: {
      tags: true,
    },
  });

  return res.status(200).json(notes);
};

export const isNotePayloadValid = (req: Request<{}, {}, NotePayload>, res: Response<{}, NotePayload>, next: NextFunction) => {
  const { title, content, tags } = { title: req.body.title, content: req.body.content, tags: req.body.tags };
  if (!("title" in req.body) || typeof title !== "string" || !title.trim().length) {
    return res.status(400).json({ message: "Invalid Note Title" });
  }
  if (!("content" in req.body) || typeof content !== "string") {
    return res.status(400).json({ message: "Invalid Note Content" });
  }

  if (!("tags" in req.body) || !Array.isArray(tags)) {
    return res.status(400).json({ message: "Invalid Note Tags" });
  }

  for (let index = 0; index < tags.length; index++) {
    const tag = tags[index];
    if (typeof tag !== "string" || !tag.length) {
      return res.status(400).json({ message: `${index + 1}th Tag is not Valid` });
    }
  }
  res.locals.title = title.trim();
  res.locals.content = content;
  res.locals.tags = tags;
  next();
};

export const isNotePresent = async (req: Request, res: Response<{}, { id: number }>, next: NextFunction) => {
  const { id } = res.locals;
  const note = await db.note.findUnique({
    where: {
      id: id,
    },
  });

  if (!note) {
    return res.status(404).json({ message: "Note is not Found" });
  }

  next();
};

export const createNote = async (req: Request, res: Response<{}, NotePayload>) => {
  const { title, content, tags } = res.locals;
  const note = await db.note.create({
    data: {
      title: title,
      content: content,
      tags: {
        connectOrCreate: tags.map((value) => ({ where: { content: value }, create: { content: value } })),
      },
    },
    include: {
      tags: true,
    },
  });

  return res.status(201).json(note);
};

export const updateNote = async (req: Request, res: Response<{}, NotePayload & { id: number }>) => {
  const { id, title, content, tags } = res.locals;
  const note = await db.note.update({
    where: {
      id: id,
    },
    data: {
      title: title,
      content: content,
      tags: {
        set: [],
        connectOrCreate: tags.map((value) => ({ where: { content: value }, create: { content: value } })),
      },
    },
    include: {
      tags: true,
    },
  });

  return res.status(200).json(note);
};

export const archiveNote = async (req: Request, res: Response<{}, { id: number }>) => {
  const { id } = res.locals;
  const note = await db.note.update({
    where: {
      id: id,
    },
    data: {
      isArchived: true,
    },
  });

  return res.status(200).json(note);
};

export const unarchiveNote = async (req: Request, res: Response<{}, { id: number }>) => {
  const { id } = res.locals;
  const note = await db.note.update({
    where: {
      id: id,
    },
    data: {
      isArchived: false,
    },
  });

  return res.status(200).json(note);
};

export const deleteNote = async (req: Request, res: Response<{}, { id: number }>) => {
  const { id } = res.locals;
  const note = await db.note.delete({
    where: {
      id: id,
    },
  });
  return res.status(200).json(note);
};
