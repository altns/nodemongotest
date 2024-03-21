import pino from "pino";
import PinoPretty from "pino-pretty";

// serve para deixar os logs mais bonitos
const stream = PinoPretty({
  colorize: true,
});

// gera logs dependendo do ambiente
export const logger = pino(
  {
    level: process.env.NODE_ENV === "production" ? "info" : "debug",
  },
  stream,
);
