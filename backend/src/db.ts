import { PrismaClient } from "./generated/prisma/client.ts";

const db = new PrismaClient();

export default db;
