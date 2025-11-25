import type { NextFunction, Request, Response } from "express";

export const isIdValid = (req: Request<{ id: string }>, res: Response<{}, { id: number }>, next: NextFunction) => {
  const id = parseInt(req.params.id);
  if (isNaN(id) || id <= 0) {
    return res.status(400).json({ message: "Invalid ID" });
  }
  res.locals.id = id;
  next();
};
