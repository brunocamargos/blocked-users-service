import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import requestId from 'express-request-id';
import bodyParser from 'body-parser';
import cors from 'cors';

import config from './config';
import logger from './commons/logger';
import requestLoggerMiddleware from './commons/middlewares/request-logger';
import errorHandlerMiddleware from './commons/middlewares/express-error-handler';
import routes from './routes';

const app = express();
app.use(compression());
app.locals.logger = logger(config.logger);
app.locals.config = config;

app.use(helmet());
app.use(cors());

app.use(requestId());
app.use((req, res, next) => {
  const childLogger = app.locals.logger.child({ reqId: req.id });
  res.locals.logger = childLogger;
  next();
});

app.use(requestLoggerMiddleware());

app.use(bodyParser.json());

app.use('/', routes);
app.use(errorHandlerMiddleware);

export default app;
