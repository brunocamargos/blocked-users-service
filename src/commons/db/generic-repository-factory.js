import { ObjectID } from 'mongodb';

const genericRepositoryFactory = dbAdapter => (collectionName) => {
  const insertOne = async document => dbAdapter.db.collection(collectionName)
    .insertOne(document)
    .then(result => result.ops[0]);

  const findOne = async (query, opts = {}) => {
    const { ...localQuery } = query;
    if (localQuery._id) {
      localQuery._id = new ObjectID(localQuery._id);
    }

    return dbAdapter.db.collection(collectionName)
      .findOne(localQuery, opts);
  };

  const updateOne = async (query, modifier, opts = {}) => dbAdapter.db.collection(collectionName)
    .updateOne(query, { $set: modifier }, opts)
    .then(({ result }) => result);

  const save = async (query, doc, opts = {}) => updateOne(query, doc, { ...opts, upsert: true });

  const findAll = async (query, opts = {}) => dbAdapter.db.collection(collectionName)
    .find(query, opts)
    .toArray();

  const remove = async (filter, opts = {}) => dbAdapter.db.collection(collectionName)
    .deleteMany(filter, opts)
    .then(({ result }) => result);

  return {
    insertOne,
    findOne,
    updateOne,
    save,
    findAll,
    remove,
  };
};

export default genericRepositoryFactory;
