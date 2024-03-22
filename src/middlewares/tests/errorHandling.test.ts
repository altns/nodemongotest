import express, { Request, Response, NextFunction } from "express";
import request from "supertest";
import { errorHandler, HttpError } from "../errorHandling";

const app = express();

app.get("/error", (req: Request, res: Response, next: NextFunction) => {
  const error = new HttpError(400, "Bad Request Error");
  next(error);
});

app.get("/generic-error", (req: Request, res: Response, next: NextFunction) => {
  const error = new Error();
  next(error);
});

app.use(errorHandler);

describe("Error Handling Middleware", () => {
  it("should handle HttpError with custom status and message", async () => {
    const response = await request(app).get("/error");

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      status: 400,
      message: "Bad Request Error",
    });
  });

  it("should handle generic errors with a 500 status", async () => {
    const response = await request(app).get("/generic-error");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      status: 500,
      message: "Something went wrong",
    });
  });
});
