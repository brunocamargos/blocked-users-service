import { ObjectID } from 'mongodb';

const genericRepositoryFactory = dbAdapter => (collectionName) => {
  const insertOne = document => dbAdapter.db.collection(collectionName)
    .insertOne(document)
    .then(result => result.ops[0]);

  const findOne = (query, options = {}) => {
    const { ...localQuery } = query;
    if (localQuery._id) {
      localQuery._id = new ObjectID(localQuery._id);
    }
    return dbAdapter.db.collection(collectionName)
      .findOne(localQuery, options);
  };

  const updateOne = (query, modifier, options = {}) => dbAdapter.db.collection(collectionName)
    .updateOne(query, { $set: modifier }, options)
    .then(({ result }) => result);

  const save = (query, doc, options = {}) => updateOne(query, doc, { ...options, upsert: true });

  const findAll = (query, options = {}) => dbAdapter.db.collection(collectionName)
    .find(query, options)
    .toArray();

  return {
    insertOne,
    findOne,
    updateOne,
    save,
    findAll,
  };
};

export default genericRepositoryFactory;
