import { MongoClient } from 'mongodb';
import mongoDbAdapter from '../../../../src/commons/db/mongo-db-adapter';
import loggerFake from '../../../doubles/logger-fake';

describe('Unit: Commons > DB > Mongo DB Adapter', () => {
  const connectionStringFake = 'url';
  const dbFake = { dbObject: 1, on: () => ({}) };
  const clientFake = {
    db: () => dbFake,
    close: sinon.spy(),
  };

  it('should connect to db', async () => {
    sinon.stub(MongoClient, 'connect').resolves(clientFake);

    const db = await mongoDbAdapter.connect(connectionStringFake, loggerFake);

    expect(db).to.deep.equal(dbFake);
    expect(MongoClient.connect.calledOnceWith(connectionStringFake, { useNewUrlParser: true }))
      .to.be.equal(true);
  });

  it('should throw exception trying to connect to db', async () => {
    const connectionRefusedError = new Error('Connection refused');
    sinon.stub(MongoClient, 'connect').rejects(connectionRefusedError);

    await expect(mongoDbAdapter.connect(connectionStringFake, loggerFake))
      .to.be.rejectedWith(connectionRefusedError);
  });

  it('should disconnect', () => {
    mongoDbAdapter.disconnect();
    expect(clientFake.close.calledOnce).to.be.equal(true);
  });

  it('should get object db', () => {
    expect(mongoDbAdapter.db).to.deep.equal(dbFake);
  });
});
