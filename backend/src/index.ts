import express, { type NextFunction, type Request, type Response } from "express";
import "dotenv/config";
import notesRouter from "./routes/notes.ts";
import tagsRouter from "./routes/tags.ts";

const PORT = 3000;

const app = express();

app.use(express.json());

app.use("/api/notes", notesRouter);
app.use("/api/tags", tagsRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
