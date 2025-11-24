import "dotenv/config";
import express, { type NextFunction, type Request, type Response } from "express";
import notesRouter from "./routes/notes.ts";
import cors from "cors";
const PORT = 3000;

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);
app.use(express.json());

app.use("/api/notes", notesRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
