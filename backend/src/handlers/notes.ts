import type { NextFunction, Request, Response } from "express";
import db from "../db.ts";

interface NoteCreationPayload {
  title: string;
  content: string;
  tags: string[];
}

export const isNoteCreationPayloadValid = (req: Request<{}, {}, NoteCreationPayload>, res: Response<{}, NoteCreationPayload>, next: NextFunction) => {
  const { title, content, tags } = { title: req.body.title.trim(), content: req.body.content, tags: req.body.tags };
  if (!title || typeof title !== "string" || !title.trim().length) {
    return res.status(400).json({ message: "Invalid Note Title" });
  }
  if (!content || typeof content !== "string") {
    return res.status(400).json({ message: "Invalid Note Content" });
  }

  if (!tags || !Array.isArray(tags)) {
    return res.status(400).json({ message: "Invalid Note Tags" });
  }

  for (let index = 0; index < tags.length; index++) {
    const tag = tags[index];
    if (typeof tag !== "string" || !tag.length) {
      return res.status(400).json({ message: `${index + 1}th Tag is not Valid` });
    }
  }
  res.locals.title = title;
  res.locals.content = content;
  res.locals.tags = tags;
  next();
};

export const createNote = async (req: Request, res: Response<{}, NoteCreationPayload>) => {
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
