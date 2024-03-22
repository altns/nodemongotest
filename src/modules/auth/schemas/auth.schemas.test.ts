import { permissionSchema } from "./permission.schema";
import { userSchema } from "./user.schema";

describe("permissionSchema Validation", () => {
  it("should validate a correct object successfully", () => {
    const validObject = {
      email: "test@example.com",
      role: "USER",
    };

    expect(() => permissionSchema.parse(validObject)).not.toThrow();
  });

  it("should throw an error for invalid email", () => {
    const invalidEmailObject = {
      email: "test",
      role: "USER",
    };

    expect(() => permissionSchema.parse(invalidEmailObject)).toThrow();
  });

  it("should throw an error for invalid role", () => {
    const invalidRoleObject = {
      email: "test@example.com",
      role: "INVALID_ROLE",
    };

    expect(() => permissionSchema.parse(invalidRoleObject)).toThrow();
  });

  it("should throw an error for missing fields", () => {
    const missingFieldsObject = {
      email: "test@example.com",
    };

    expect(() => permissionSchema.parse(missingFieldsObject)).toThrow();
  });
});

describe("userSchema Validation", () => {
  describe("Email Validation", () => {
    it("should validate a correct email", () => {
      const validUser = { email: "valid@example.com", password: "password123" };
      expect(() => userSchema.parse(validUser)).not.toThrow();
    });

    it("should throw an error for invalid email", () => {
      const invalidEmailUser = { email: "invalid", password: "password123" };
      expect(() => userSchema.parse(invalidEmailUser)).toThrow(
        "Invalid email address",
      );
    });
  });

  describe("Password Validation", () => {
    it("should validate a correct password", () => {
      const validUser = { email: "valid@example.com", password: "password123" };
      expect(() => userSchema.parse(validUser)).not.toThrow();
    });

    it("should throw an error for a password that is too short", () => {
      const shortPasswordUser = {
        email: "valid@example.com",
        password: "short",
      };
      expect(() => userSchema.parse(shortPasswordUser)).toThrow(
        "Password must be at least 8 characters long",
      );
    });
  });
});
