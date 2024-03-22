import express, { Express } from "express";
import request from "supertest";
import { requireRole } from "../permission";

const app: Express = express();
app.use(express.json());

app.use((req, _, next) => {
  req.user = { id: "123", email: "teste@teste.teste", role: "USER" };
  next();
});

app.get("/protected-user", requireRole("USER"), (req, res) => {
  res.send("Access granted for USER.");
});

app.get("/protected-adm", requireRole("ADM"), (req, res) => {
  res.send("Access granted for ADM.");
});

describe("requireRole Middleware", () => {
  it("should grant access to a route protected for USER role", async () => {
    const response = await request(app).get("/protected-user");
    expect(response.text).toEqual("Access granted for USER.");
    expect(response.statusCode).toBe(200);
  });

  it("should deny access to a route protected for ADM role", async () => {
    const response = await request(app).get("/protected-adm");
    expect(response.body).toEqual({
      message: "Access denied. Insufficient permissions.",
    });
    expect(response.statusCode).toBe(403);
  });
});
