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
      role: "USER",
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
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role }, // Inclua a role aqui
    JWT_SECRET,
    { expiresIn: "24h" },
  );
  return token;
};

export const updateUserRole = async (
  userEmail: string,
  newRole: "ADM" | "USER",
) => {
  console.log("🚀 ~ userEmail:", userEmail);
  console.log("🚀 ~ newRole:", newRole);
  const updatedUser = await prisma.user.update({
    where: { email: userEmail },
    data: { role: newRole },
  });
  return updatedUser;
};
