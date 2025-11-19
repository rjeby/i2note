import type { NextFunction, Request, Response } from "express";
import type { Note, Tag } from "../generated/prisma/client.ts";
import db from "../db.ts";

export const getAllNotes = async (req: Request, res: Response, next: NextFunction) => {
  const notes = await db.note.findMany();
  return res.status(200).json(notes);
};

export const getAllNoteTags = async (req: Request, res: Response<{}, { id: number }>, next: NextFunction) => {
  const { id } = res.locals;
  const tags = await db.tag.findMany({
    where: {
      notes: {
        some: { id: id },
      },
    },
  });
  return res.status(200).json(tags);
};

export const createNote = async (req: Request, res: Response<{}, { title: string; content: string }>, next: NextFunction) => {
  const { title, content } = res.locals;
  const note = await db.note.create({ data: { title: title, content: content } });
  return res.status(201).json(note);
};

export const isNoteTagPayloadValid = (req: Request<{}, {}, { content: string }>, res: Response<{}, { content: string }>, next: NextFunction) => {
  const { content } = req.body;
  if (!content || !content.length) {
    return res.status(400).json({ message: "Invalid note tag" });
  }

  res.locals.content = content;
  next();
};

export const createNoteTag = async (req: Request, res: Response<{}, { id: number; content: string }>) => {
  const { id, content } = res.locals;
  const note = await db.note.update({
    where: {
      id: id,
    },
    data: {
      tags: {
        connectOrCreate: [
          {
            where: { content: content },
            create: { content: content },
          },
        ],
      },
    },
    include: {
      tags: true,
    },
  });

  return res.status(201).json(note);
};

export const isNotePayloadValid = (req: Request<{}, {}, { title: string; content: string }>, res: Response, next: NextFunction) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: "Invalid note payload" });
  }
  res.locals.title = title;
  res.locals.content = content;
  next();
};

export const isNotePresent = async (req: Request, res: Response<{}, { id: number; note: Note }>, next: NextFunction) => {
  const { id } = res.locals;
  const note = await db.note.findUnique({
    where: {
      id: id,
    },
  });
  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }
  res.locals.note = note;
  next();
};

export const getNoteById = async (req: Request, res: Response<{}, { note: Note }>, next: NextFunction) => {
  const { note } = res.locals;
  return res.status(201).json(note);
};

export const updateNote = async (req: Request, res: Response<{}, { id: number; title: string; content: string }>) => {
  const { id, title, content } = res.locals;
  const note = await db.note.update({ where: { id: id }, data: { title: title, content: content } });
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
