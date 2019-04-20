import genericRepositoryFactory from '../../../../src/commons/db/generic-repository-factory';
import dbAdapterStubFactory from '../../../doubles/db-adapter-stub-factory';

describe('Unit: Commons > DB > Generic Repository Factory', () => {
  let insertOneStub;
  let updateOneStub;
  let findOneStub;
  let genericRepository;
  beforeEach(() => {
    const createGenericRepository = () => {
      insertOneStub = sinon.stub().resolves({ ops: [{ insertOne: 'ok' }] });
      updateOneStub = sinon.stub().resolves({ result: { updateOne: 'ok' } });
      findOneStub = sinon.stub().resolves({ findOne: 'ok' });
      const dbAdapterStub = dbAdapterStubFactory(insertOneStub, updateOneStub, findOneStub);
      return genericRepositoryFactory(dbAdapterStub);
    }

    genericRepository = createGenericRepository();
  });

  it('should insert one document', async () => {
    const doc = {};
    const docInserted = await genericRepository().insertOne(doc);
    expect(docInserted).to.deep.equal({ insertOne: 'ok' });
    expect(insertOneStub.calledOnceWith(doc)).to.be.equal(true);
  });

  it('should update one document', async () => {
    const query = { a: 1 };
    const modifier = { a: 2 };
    const docUpdated = await genericRepository().updateOne(query, modifier);
    expect(docUpdated).to.deep.equal({ updateOne: 'ok' });
    expect(updateOneStub.calledOnceWith(query, { $set: modifier }, {})).to.be.equal(true);
  });

  it('should find one document', async () => {
    const query = { a: 1 };
    const doc = await genericRepository().findOne(query);
    expect(doc).to.deep.equal({ findOne: 'ok' });
    expect(findOneStub.calledOnceWith(query, {})).to.be.equal(true);
  });

  it('should save one document', async () => {
    const query = { a: 1 };
    const doc = { b: 'ok' };
    const docSaved = await genericRepository().save(query, doc);
    expect(docSaved).to.deep.equal({ updateOne: 'ok' });
    expect(updateOneStub.calledOnceWith(query, { $set: doc }, { upsert: true })).to.be.equal(true);
  });
});
