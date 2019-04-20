import supertest from 'supertest';

import dbClient from '../../src/commons/db';
import config from '../../src/config';
import app from '../../src';

before('Before', async () => {
  await dbClient.connect(`${config.db.url}-test`);

  global.config = config;
  global.request = supertest(app);
});

after('After', async () => {
  await dbClient.db.dropDatabase();
  await dbClient.disconnect();
});
