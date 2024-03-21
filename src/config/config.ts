import dotenv from "dotenv";
import path from "path";
import { z } from "zod";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const envVarsSchema = z.object({
  NODE_ENV: z.enum(["production", "development", "test"]).optional(),
  PORT: z.preprocess((input) => Number(input), z.number().default(3000)),
  DATABASE_URL: z.string().url(),
});

const parsedEnv = envVarsSchema.safeParse(process.env);

if (!parsedEnv.success) {
  throw new Error(`Config validation error: ${parsedEnv.error.message}`);
}

export default {
  env: parsedEnv.data.NODE_ENV,
  port: parsedEnv.data.PORT,
  databaseUrl: parsedEnv.data.DATABASE_URL,
};
