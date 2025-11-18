import express from "express";
import db from "./db.ts";

console.log(db);
const app = express();
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
