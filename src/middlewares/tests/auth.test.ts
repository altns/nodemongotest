import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import request from "supertest";
import { authenticate } from "../auth";
import config from "../../config/config";

const app = express();

app.get("/protected", authenticate, (req: Request, res: Response) => {
  res.json({ message: "You have accessed a protected route", user: req.user });
});

describe("authenticate Middleware", () => {
  it("should block access if no token is provided", async () => {
    const response = await request(app).get("/protected");
    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: "Access denied" });
  });

  it("should allow access with a valid token", async () => {
    const token = jwt.sign(
      { id: "123", email: "test@example.com", role: "USER" },
      config.jwtSecret,
    );
    const response = await request(app)
      .get("/protected")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "You have accessed a protected route",
    );
    expect(response.body.user).toEqual({
      id: "123",
      email: "test@example.com",
      role: "USER",
    });
  });

  it("should block access with an invalid token", async () => {
    const response = await request(app)
      .get("/protected")
      .set("Authorization", "Bearer invalidtokenhere");

    expect(response.status).toBe(403);
    expect(response.body).toEqual({ message: "Invalid token" });
  });
});
