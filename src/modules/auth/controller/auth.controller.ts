import { NextFunction, Request, Response } from "express";
import { createUser, loginUser } from "../services/auth.services";
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
