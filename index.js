import swaggerTools from 'swagger-tools';

import app from './src';
import dbClient from './src/commons/db';
import swaggerDoc from './swagger.json';

const { logger, config } = app.locals;

process
  .on('uncaughtException', (err) => {
    logger.fatal({ err }, 'Uncaught Exception');
    process.exit(1);
  })
  .on('unhandledRejection', (err) => {
    logger.fatal({ err }, 'Unhandled Rejection Exception');
    process.exit(1);
  });

dbClient.connect(config.db.url, logger)
  .then(() => {
    swaggerTools.initializeMiddleware(swaggerDoc, (middleware) => {
      app.use(middleware.swaggerUi());

      const server = app.listen(config.port, () => logger.info(`API listening on port ${config.port}!`));
      server.on('close', () => {
        dbClient.disconnect();
        logger.info('Server closed!');
      });
    });
  });
