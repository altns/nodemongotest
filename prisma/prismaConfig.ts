import { PrismaClient } from "@prisma/client";

// configuração do prisma client para retornar logs de querys
const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

export default prisma;
