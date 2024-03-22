import { NextFunction, Request, Response } from "express";
import {
  createUser,
  loginUser,
  updateUserRole,
} from "../services/auth.services";
import { handlePrismaError } from "@/utils/handlePrismaError";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;
    const user = await createUser(email, password);
    res.status(201).json(user);
  } catch (error) {
    next(handlePrismaError(error));
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;
    const token = await loginUser(email, password);
    res.json({ token });
  } catch (error) {
    next(handlePrismaError(error));
  }
};

export const changeUserRole = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, role } = req.body; // Ou ajuste conforme a sua estratégia de recebimento dos dados

  try {
    const updatedUser = await updateUserRole(email, role);
    res.json({ message: "User role updated successfully", user: updatedUser });
  } catch (error) {
    next(handlePrismaError(error));
  }
};
