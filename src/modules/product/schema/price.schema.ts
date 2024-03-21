import { z } from "zod";

// Esquema para validação do preço
export const priceQuerySchema = z.object({
  price: z
    .string()
    .regex(/^\d+(\.\d+)?$/, "Price must be a valid number")
    .transform(Number),
});
