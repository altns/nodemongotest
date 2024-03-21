import { z } from "zod";

export const descriptionQuerySchema = z.object({
  keyword: z.string().min(1, "Keyword is required"),
});
