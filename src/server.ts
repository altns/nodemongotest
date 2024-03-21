import { app } from "./app";
import { logger } from "./commons/logger";
import config from "./config/config";

const PORT = config.port || 3000;

app.listen(PORT, () => logger.info(`Server is running on port: ${PORT}`));
