import express from "express";
import {
  changeUserRole,
  login,
  registerUser,
} from "./controller/auth.controller";
import { validateSchema } from "@/midlewares/validateSchema";
import { userSchema } from "./schemas/user.schema";
import { authenticate } from "@/midlewares/auth";
import { requireRole } from "@/midlewares/permission";
import { permissionSchema } from "./schemas/permission.schema";

const authRoutes = express.Router();

authRoutes.post("/register", validateSchema(userSchema), registerUser);
authRoutes.post("/login", validateSchema(userSchema), login);
authRoutes.post(
  "/user/change-role",
  authenticate,
  requireRole("ADM"),
  validateSchema(permissionSchema),
  changeUserRole,
);

export default authRoutes;
