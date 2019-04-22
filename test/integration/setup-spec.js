import supertest from 'supertest';

import dbClient from '../../src/commons/db';
import config from '../../src/config';
import app from '../../src';

const COLLECTION_NAME = 'blockedUsers';

const createCPFIndex = async db => db.collection(COLLECTION_NAME)
  .createIndex({ cpf: 1 }, { unique: 1 });

before(async () => {
  const db = await dbClient.connect(`${config.db.url}-test`);

  await createCPFIndex(db);
  global.config = config;
  global.request = supertest(app);
});

afterEach(async () => dbClient.db.collection(COLLECTION_NAME).deleteMany({}));

after(async () => {
  await dbClient.db.dropDatabase();
  await dbClient.disconnect();
});
