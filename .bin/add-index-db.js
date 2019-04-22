import dbClient from '../src/commons/db';

dbClient.connect(process.env.DB_URL)
  .then((db) => {
    const COLLECTION_NAME = 'blockedUsers';
    const INDEX_NAME = 'cpf_index';
    const collection = db.collection(COLLECTION_NAME);
    // console.log(collection.indexExists(INDEX_NAME).then(console.log));
    collection.createIndex({ cpf: 1 }, { unique: 1, name: INDEX_NAME }).then(console.log).catch(console.error);

    // collection.indexes().then(console.log);
    dbClient.disconnect();
  });
