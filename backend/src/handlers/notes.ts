import type { NextFunction, Request, Response } from "express";
import type { Note, Tag } from "../generated/prisma/client.ts";
import db from "../db.ts";

export const getAllNotes = async (req: Request, res: Response, next: NextFunction) => {
  const notes = await db.note.findMany();
  res.status(200).json(notes);
};

export const createNote = async (req: Request<{}, {}, Omit<Note, "id" | "isArchived" | "createdAt" | "editedAt">>, res: Response, next: NextFunction) => {
  console.log(req.body)
    const { title, content } = req.body;

  const note = await db.note.create({
    data: {
      title: title,
      content: content,
    },
  });

  res.status(201).json(note);
};
