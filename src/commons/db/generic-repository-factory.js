import { ObjectID } from 'mongodb';

const genericRepositoryFactory = dbAdapter => (collectionName) => {
  const insertOne = async document => dbAdapter.db.collection(collectionName)
    .insertOne(document)
    .then(result => result.ops[0]);

  const parseMongoId = (query) => {
    const { id, _id, ...localQuery } = query;

    const idToParse = id || _id;
    if (idToParse) {
      localQuery._id = new ObjectID(idToParse);
    }

    return localQuery;
  };

  const findOne = async (query, opts = {}) => dbAdapter.db.collection(collectionName)
    .findOne(parseMongoId(query), opts);

  const updateOne = async (query, modifier, opts = {}) => dbAdapter.db.collection(collectionName)
    .updateOne(query, { $set: modifier }, opts)
    .then(({ result }) => result);

  const save = async (query, doc, opts = {}) => updateOne(query, doc, { ...opts, upsert: true });

  const findAll = async (query, opts = {}) => dbAdapter.db.collection(collectionName)
    .find(query, opts)
    .toArray();

  const remove = async (filter, opts = {}) => dbAdapter.db.collection(collectionName)
    .deleteMany(parseMongoId(filter), opts)
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
