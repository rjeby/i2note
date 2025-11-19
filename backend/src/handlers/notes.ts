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

export const isIdValid = (req: Request<{ id: string }>, res: Response<{}, { id: number }>, next: NextFunction) => {
  const id = parseInt(req.params.id);
  if (isNaN(id) || id <= 0) {
    return res.status(400).json({ message: "Invalid ID" });
  }
  res.locals.id = id;
  next();
};

export const getNoteById = async (req: Request<{ id: string }>, res: Response<{}, { id: number }>, next: NextFunction) => {
  const { id } = res.locals;
  const note = await db.note.findUnique({
    where: {
      id: id,
    },
  });
  if (!note) {
    return res.status(404).json({ message: "Note not Found" });
  }
  return res.status(201).json(note);
};

export const updateNote = async (req: Request<{}, {}, { title: string; content: string }>, res: Response<{}, { id: number }>) => {
  const { id } = res.locals;
  const { title, content } = req.body;
  const note = await db.note.findUnique({
    where: {
      id: id,
    },
  });
  if (!note) {
    return res.status(404).json({ message: "Note not Found" });
  }

  const updatedNote = await db.note.update({ where: { id: id }, data: { title: title, content: content } });
  return res.status(200).json(updatedNote);
};

export const deleteNote = async (req: Request, res: Response<{}, { id: number }>) => {
  const { id } = res.locals;
  const note = await db.note.findUnique({
    where: {
      id: id,
    },
  });
  if (!note) {
    return res.status(404).json({ message: "Note not Found" });
  }
  const deletedNote = await db.note.delete({
    where: {
      id: id,
    },
  });

  return res.status(200).json(deletedNote);
};
