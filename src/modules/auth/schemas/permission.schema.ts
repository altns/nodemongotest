import { z } from "zod";

const UserRoleSchema = z.enum(["ADM", "USER"]);

export const permissionSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  role: UserRoleSchema,
});
