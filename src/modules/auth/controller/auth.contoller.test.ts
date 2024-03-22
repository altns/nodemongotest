import { Request, Response } from "express";
import {
  registerUser,
  login,
  changeUserRole,
} from "../controller/auth.controller";
import {
  createUser,
  loginUser,
  updateUserRole,
} from "../services/auth.services";
import { handlePrismaError } from "../../../utils/handlePrismaError";

jest.mock("../services/auth.services");
jest.mock("../../../utils/handlePrismaError");

describe("Auth Controller", () => {
  const req = {} as Request;
  const res = {} as Response;
  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("registerUser", () => {
    it("should register a new user", async () => {
      const user = { email: "test@example.com", password: "password123" };
      const createdUser = { id: 1, ...user };
      const statusMock = jest.fn().mockReturnThis();
      const jsonMock = jest.fn();
      res.status = statusMock;
      res.json = jsonMock;

      req.body = user;
      (createUser as jest.Mock).mockResolvedValue(createdUser);

      await registerUser(req, res, next);

      expect(createUser).toHaveBeenCalledWith(user.email, user.password);
      expect(statusMock).toHaveBeenCalledWith(201);
      expect(jsonMock).toHaveBeenCalledWith(createdUser);
    });

    it("should call next with error if login fails", async () => {
      const error = new Error("Register failed");
      req.body = { email: "test@example.com", password: "password123" };

      (createUser as jest.Mock).mockRejectedValue(error);

      await registerUser(req, res, next);

      expect(handlePrismaError).toHaveBeenCalledWith(error);
      expect(next).toHaveBeenCalled();
    });
  });

  describe("login", () => {
    it("should login a user", async () => {
      const user = { email: "test@example.com", password: "password123" };
      const token = "generatedToken";

      req.body = user;
      (loginUser as jest.Mock).mockResolvedValue(token);

      await login(req, res, next);

      expect(loginUser).toHaveBeenCalledWith(user.email, user.password);
      expect(res.json).toHaveBeenCalledWith({ token });
    });

    it("should call next with error if login fails", async () => {
      const error = new Error("Login failed");
      req.body = { email: "test@example.com", password: "password123" };

      (loginUser as jest.Mock).mockRejectedValue(error);

      await login(req, res, next);

      expect(handlePrismaError).toHaveBeenCalledWith(error);
      expect(next).toHaveBeenCalled();
    });
  });

  describe("changeUserRole", () => {
    it("should change user role", async () => {
      const userData = { email: "test@example.com", role: "ADM" };
      const updatedUser = { id: 1, ...userData };

      req.body = userData;
      (updateUserRole as jest.Mock).mockResolvedValue(updatedUser);

      await changeUserRole(req, res, next);

      expect(updateUserRole).toHaveBeenCalledWith(
        userData.email,
        userData.role,
      );
      expect(res.json).toHaveBeenCalledWith({
        message: "User role updated successfully",
        user: updatedUser,
      });
      expect(next).not.toHaveBeenCalled();
    });

    it("should call next with error if role change fails", async () => {
      const error = new Error("Role change failed");
      req.body = { email: "test@example.com", role: "ADM" };

      (updateUserRole as jest.Mock).mockRejectedValue(error);

      await changeUserRole(req, res, next);

      expect(handlePrismaError).toHaveBeenCalledWith(error);
      expect(next).toHaveBeenCalled();
    });
  });
});
