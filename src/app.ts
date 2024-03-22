import express from "express";
import helmet from "helmet";
import cors from "cors";
import { router } from "./routes";
import httpLogger from "./middlewares/httpLogger";
import { HttpError, errorHandler } from "./middlewares/errorHandling";

// inicia express
const app = express();

// adiciona logger
app.use(httpLogger);

// adiciona segurança nos headers
app.use(helmet());

// adiciona suporte para json
app.use(express.json());

// habilita cors
app.use(cors());
app.options("*", cors());

// adiciona as rotas da api
app.use(router);

// retorna erro 404 para qualquer rota inexistente
app.use((req, res, next) => {
  next(new HttpError(404, "Path does not exist"));
});

// adiciona tratamento de erro
app.use(errorHandler);

export { app };
