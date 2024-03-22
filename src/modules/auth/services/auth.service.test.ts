import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../../../../prisma/prismaConfig";
import { createUser, loginUser, updateUserRole } from "./auth.services";

jest.mock("@/config/config", () => ({
  jwtSecret: "mysecret",
}));

jest.mock("bcrypt", () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
}));

jest.mock("../../../../prisma/prismaConfig", () => ({
  user: {
    create: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
  },
}));

describe("AuthService", () => {
  describe("createUser", () => {
    it("should create a new user", async () => {
      const email = "test@example.com";
      const password = "password123";

      (bcrypt.hash as jest.Mock).mockResolvedValue("hashedPassword");
      (prisma.user.create as jest.Mock).mockResolvedValue({ email, password });

      const result = await createUser(email, password);

      expect(bcrypt.hash).toHaveBeenCalledWith(password, 10);
      expect(prisma.user.create).toHaveBeenCalledWith({
        data: {
          email,
          password: "hashedPassword",
          role: "USER",
        },
      });
      expect(result).toEqual({ email, password });
    });
  });

  describe("loginUser", () => {
    it("should login a user with correct credentials", async () => {
      const email = "test@example.com";
      const password = "password123";
      const user = { id: 1, email, password: "hashedPassword", role: "USER" };
      const token = "generatedToken";

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (jwt.sign as jest.Mock).mockReturnValue(token);

      const result = await loginUser(email, password);

      expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email } });
      expect(bcrypt.compare).toHaveBeenCalledWith(password, "hashedPassword");
      expect(jwt.sign).toHaveBeenCalledWith(
        { id: user.id, email: user.email, role: user.role },
        "mysecret",
        { expiresIn: "24h" },
      );
      expect(result).toEqual(token);
    });

    it("should throw an error if user is not found", async () => {
      const email = "nonexistent@example.com";
      const password = "password123";

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(loginUser(email, password)).rejects.toThrow(
        "User not found",
      );

      expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email } });
    });

    it("should throw an error if password is incorrect", async () => {
      const email = "test@example.com";
      const password = "wrongpassword";
      const user = { id: 1, email, password: "hashedPassword", role: "USER" };

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(loginUser(email, password)).rejects.toThrow(
        "Password is incorrect",
      );

      expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email } });
      expect(bcrypt.compare).toHaveBeenCalledWith(password, "hashedPassword");
    });
  });

  describe("updateUserRole", () => {
    it("should update user role", async () => {
      const userEmail = "test@example.com";
      const newRole = "ADM";
      const updatedUser = { id: 1, email: userEmail, role: newRole };

      (prisma.user.update as jest.Mock).mockResolvedValue(updatedUser);

      const result = await updateUserRole(userEmail, newRole);

      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { email: userEmail },
        data: { role: newRole },
      });
      expect(result).toEqual(updatedUser);
    });
  });
});
