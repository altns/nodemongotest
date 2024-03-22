import request from "supertest";
import express from "express";
import bodyParser from "body-parser";
import authRoutes from "./auth.routes"; // Ajuste o caminho conforme necessário

const app = express();
app.use(bodyParser.json());
app.use(authRoutes);

// teste de integração
// fiquei umas 3 horas tentando fazer esse teste passar mas não consegui
// então percebi que estava com o servidor parado, então iniciei o servidor
// passou de primeira

describe("Auth Routes", () => {
  describe("POST /register", () => {
    it("should register a user successfully with valid data", async () => {
      const userData = { email: "test1@example.com", password: "password123" };
      const response = await request(app).post("/register").send(userData);

      expect(response.status).toBe(201);
      expect(response.body.email).toEqual(userData.email);
    });
  });

  describe("POST /login", () => {
    it("should login the user with correct credentials", async () => {
      const userData = { email: "test@example.com", password: "password123" };
      const response = await request(app).post("/login").send(userData);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("token");
    });
  });

  describe("POST /user/change-role", () => {
    it("should require authentication", async () => {
      const response = await request(app)
        .post("/user/change-role")
        .send({ email: "user@example.com", role: "USER" });

      expect(response.status).toBe(401);
    });
  });
});
