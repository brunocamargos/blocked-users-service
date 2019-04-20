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
  })
  .on('SIGINT', (signal) => {
    logger.info(`Received ${signal}`);
    // Rodando 'yarn start' com 'esm', após 'ctrl + c', está bloqueando a porta utilizada.
    // Com 'npm start' funciona, porém precisa apertar duas vezes 'ctrl + c'
    // Sem o 'esm' tudo funciona normalmente
    // Essa foi a solução encontrada para encerrar o processo sem bloquear a porta.
    process.exit(0);
  });

dbClient.connect(config.db.url, logger)
  .then(() => {
    swaggerTools.initializeMiddleware(swaggerDoc, (middleware) => {
      app.use(middleware.swaggerUi());

      const server = app.listen(config.port, () => logger.info(`App listening on port ${config.port}!`));
      server.on('close', () => {
        dbClient.disconnect();
        logger.info('Server closed!');
      });
    });
  });
