import { Request, Response, ErrorRequestHandler, NextFunction } from "express";
import { logger } from "../utils/logger";

// middleware para tratamento de erros
export class HttpError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  logger.error(err.stack);
  res.status(status).json({ status, message });
};
