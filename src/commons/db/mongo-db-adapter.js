import { MongoClient } from 'mongodb';

const state = {
  client: null,
  db: null,
};

export default {
  async connect(dbUrl, logger = console) {
    try {
      state.client = await MongoClient.connect(dbUrl, { useNewUrlParser: true });
      state.db = state.client.db();
      logger.info('Connected to database!');
    } catch (err) {
      logger.error({ err }, 'Unable to connect to database:');
      throw err;
    }

    state.db.on('close', () => logger.info('Disconnected from database!'));

    return state.db;
  },

  disconnect() { return state.client.close(); },

  get db() { return state.db; },
};
