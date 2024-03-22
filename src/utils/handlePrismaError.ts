import { HttpError } from "../middlewares/errorHandling";
import { Prisma } from "@prisma/client";
import { logger } from "./logger";

// mapeamento de alguns dos erros que o prisma pode retornar pelo seu código
const prismaErrorMap: Record<string, { status: number; message: string }> = {
  P2025: { status: 404, message: "The requested resource was not found." },
  P2002: { status: 409, message: "Unique constraint failed on the fields." },
  P2003: { status: 403, message: "Foreign key constraint failed." },
  P2004: { status: 400, message: "A constraint failed on the database." },
  P2007: {
    status: 400,
    message: "Data validation error (type mismatch or invalid format).",
  },
  P2011: { status: 400, message: "Null constraint violation." },
  P2016: { status: 400, message: "Record to update not found." },
};

// esse util foi criado para lidar com os erros que o prisma pode retornar
// sem ele os erros ficam genéricos demais e o usuário fica sem dado suficiente
export const handlePrismaError = (error: unknown): HttpError => {
  let errorMessage = "An unexpected error occurred.";
  let statusCode = 500;

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const errorInfo = prismaErrorMap[error.code];
    if (errorInfo) {
      statusCode = errorInfo.status;
      errorMessage = `${errorInfo.message} Details: ${error.message}`;
    } else {
      logger.error(
        `Unmapped Prisma error code: ${error.code}, message: ${error.message}`,
      );
    }
  } else if (error instanceof Prisma.PrismaClientValidationError) {
    statusCode = 400;
    errorMessage = "Validation failed for the request.";
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return new HttpError(statusCode, errorMessage);
};
