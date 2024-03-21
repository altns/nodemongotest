import { logger } from "../utils/logger";
import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";
import { HttpError } from "./errorHandling";

//fundão destinada a validar o schema de uma requisição
export const validateSchema = (
  schema: ZodSchema,
  source: "body" | "query" = "body",
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const dataToValidate = source === "body" ? req.body : req.query;
      schema.parse(dataToValidate);
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
      next(new HttpError(500, "An unexpected error occurred"));
    }
  };
};
