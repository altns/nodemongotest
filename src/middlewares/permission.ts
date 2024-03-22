import { Request, Response, NextFunction } from "express";

export const requireRole = (role: "ADM" | "USER") => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.user && req.user.role === role) {
      next();
    } else {
      res
        .status(403)
        .json({ message: "Access denied. Insufficient permissions." });
    }
  };
};
