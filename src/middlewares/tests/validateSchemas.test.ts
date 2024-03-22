import express from "express";
import request from "supertest";
import { z } from "zod";
import { validateSchema } from "../validateSchema";
import { errorHandler } from "../errorHandling";

const app = express();
app.use(express.json());

const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  age: z.number().min(18, "Must be 18 or older"),
});

app.post("/test", validateSchema(userSchema), (req, res) => {
  res.status(200).json({ message: "Validation passed", data: req.body });
});

app.use(errorHandler);

describe("validateSchema Middleware with errorHandler", () => {
  it("should pass validation for valid data", async () => {
    const response = await request(app)
      .post("/test")
      .send({ name: "John Doe", age: 30 });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      message: "Validation passed",
      data: { name: "John Doe", age: 30 },
    });
  });

  it("should return a 400 status for invalid data, handled by errorHandler", async () => {
    const response = await request(app)
      .post("/test")
      .send({ name: "", age: 17 });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      errors: expect.arrayContaining([
        { path: "name", message: "Name is required" },
        { path: "age", message: "Must be 18 or older" },
      ]),
    });
  });
});
