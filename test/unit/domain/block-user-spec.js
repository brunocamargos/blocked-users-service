import blockUser from '../../../src/domain/block-user';
import blockedUsersRepositoryFake from '../../doubles/blocked-users-repository-fake';
import loggerFake from '../../doubles/logger-fake';

describe('Unit: Domain > Block User', () => {
  const cpf = '56235365063';
  it('should block a given user', async () => {
    sinon.stub(blockedUsersRepositoryFake, 'insertOne')
      .resolves({ cpf, _id: '5cbb32fe74fd341eeef9d201' });

    const blockedUser = await blockUser(blockedUsersRepositoryFake)(cpf, loggerFake);

    expect(blockedUsersRepositoryFake.insertOne.calledOnceWith({ cpf })).to.be.equal(true);
    expect(blockedUser).to.have.property('cpf', cpf);
  });

  it('should throw duplicate key exception when blockedUser already exist', async () => {
    const mongoDuplicateKeyError = Error('Simulate mongo duplicate key error');
    mongoDuplicateKeyError.code = 11000;
    sinon.stub(blockedUsersRepositoryFake, 'insertOne').rejects(mongoDuplicateKeyError);

    await expect(blockUser(blockedUsersRepositoryFake)(cpf, loggerFake))
      .to.be.rejectedWith(Error, 'User already blocked');
  });

  it('should throw exception when insert fails', async () => {
    const mongoError = Error('Simulate mongo error');
    sinon.stub(blockedUsersRepositoryFake, 'insertOne').rejects(mongoError);

    await expect(blockUser(blockedUsersRepositoryFake)(cpf, loggerFake))
      .to.be.rejectedWith(mongoError);
  });
});
