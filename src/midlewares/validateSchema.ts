import { logger } from "../commons/logger";
import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";

export const validateSchema = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((err) => ({
          path: err.path ? err.path.join(".") : "",
          message: err.message,
        }));
        logger.error(
          `Validation error: ${errorMessages.map((err) => err.message)}`,
        );
        return res.status(400).json({ errors: errorMessages });
      }
      // Para erros não Zod, log e resposta genérica
      logger.error(`Validation error: ${error}`);
      res.status(500).json({ message: "An unexpected error occurred" });
    }
  };
};
