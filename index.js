import swaggerTools from 'swagger-tools';

import app from './src';
import dbClient from './src/commons/db';
import swaggerDoc from './swagger.json';

const { logger, config } = app.locals;

process
  .once('uncaughtException', (err) => {
    logger.fatal({ err }, 'Uncaught Exception');
    process.exit(1);
  })
  .on('unhandledRejection', (err) => {
    logger.fatal({ err }, 'Unhandled Rejection Exception');
    process.exit(1);
  });

// Este deveria estar em um serviço (docker) para tratar "migrations" e afins.
// Fiz aqui devido ao pouco tempo que tenho para fazer o desafio.
const seedDb = async (db) => {
  const COLLECTION_NAME = 'blockedUsers';
  const INDEX_NAME = 'cpf_index';
  const collection = db.collection(COLLECTION_NAME);
  await collection.createIndex({ cpf: 1 }, { unique: 1, name: INDEX_NAME });
};

const startApp = () => {
  swaggerTools.initializeMiddleware(swaggerDoc, (middleware) => {
    app.use(middleware.swaggerUi());

    const server = app.listen(config.port,
      () => logger.info(`API listening on http://localhost:${config.port}`));

    server.on('close', () => {
      dbClient.disconnect();
      logger.info('Server closed!');
    });
  });
};

dbClient.connect(config.db.url, logger)
  .then(seedDb)
  .then(startApp);
