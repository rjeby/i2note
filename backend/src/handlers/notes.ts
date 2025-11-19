import type { NextFunction, Request, Response } from "express";
import type { Note, Tag } from "../generated/prisma/client.ts";
import db from "../db.ts";

export const getAllNotes = async (req: Request, res: Response, next: NextFunction) => {
  const notes = await db.note.findMany();
  return res.status(200).json(notes);
};

export const createNote = async (req: Request<{}, {}, { title: string; content: string }>, res: Response, next: NextFunction) => {
  const { title, content } = req.body;
  const note = await db.note.create({ data: { title: title, content: content } });
  return res.status(201).json(note);
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

export const updateNote = async (req: Request<{}, {}, { title: string; content: string }>, res: Response<{}, { id: number }>) => {
  const { id } = res.locals;
  const { title, content } = req.body;
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
