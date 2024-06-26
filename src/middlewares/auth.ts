import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "@/config/config";

const JWT_SECRET = config.jwtSecret;

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access denied" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
      email: string;
      role: "ADM" | "USER";
    };
    req.user = { id: decoded.id, email: decoded.email, role: decoded.role };
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};
