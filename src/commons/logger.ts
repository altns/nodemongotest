// logger.ts
import pino from "pino";
import PinoPretty from "pino-pretty";

const stream = PinoPretty({
  colorize: true,
});

export const logger = pino(
  {
    level: process.env.NODE_ENV === "production" ? "info" : "debug",
  },
  stream,
);
