import config from "@/config/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../../../../prisma/prismaConfig";

const JWT_SECRET = config.jwtSecret;

export const createUser = async (email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });
  return user;
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error("User not found");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Password is incorrect");
  }
  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });
  return token;
};
