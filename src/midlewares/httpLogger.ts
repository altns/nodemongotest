import pinoHttp from "pino-http";
import { logger } from "../commons/logger";

const httpLogger = pinoHttp({
  logger,
  serializers: {
    req: (request) => ({
      method: request.method,
      url: request.url,
      params: request.params,
      query: request.query,
    }),
    res: (response) => ({
      statusCode: response.statusCode ?? 200,
    }),
  },
  customLogLevel: (req, res) => {
    const statusCode = res.statusCode ?? 500;

    if (statusCode >= 200 && statusCode < 300) {
      return "info";
    } else if (statusCode >= 400 && statusCode < 500) {
      return "warn";
    } else {
      return "error";
    }
  },
});

export default httpLogger;
