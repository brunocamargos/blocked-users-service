import supertest from 'supertest';

import dbClient from '../../src/commons/db';
import config from '../../src/config';
import app from '../../src';

const createCPFIndex = async (db) => {
  const COLLECTION_NAME = 'blockedUsers';
  await db.collection(COLLECTION_NAME).createIndex({ cpf: 1 }, { unique: 1 });
};

before('Before', async () => {
  const db = await dbClient.connect(`${config.db.url}-test`);

  await createCPFIndex(db);
  global.config = config;
  global.request = supertest(app);
});

after('After', async () => {
  await dbClient.db.dropDatabase();
  await dbClient.disconnect();
});
