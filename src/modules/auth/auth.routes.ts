// src/routes/userRoutes.ts
import express from "express";
import { login, registerUser } from "./controller/auth.controller";
import { validateSchema } from "@/midlewares/validateSchema";
import { userSchema } from "./schemas/user.schema";

const authRoutes = express.Router();

authRoutes.post("/register", validateSchema(userSchema), registerUser);
authRoutes.post("/login", validateSchema(userSchema), login);

export default authRoutes;
