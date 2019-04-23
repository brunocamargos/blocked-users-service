import findBlockedUser from '../../../src/domain/find-blocked-user';
import blockedUsersRepositoryFake from '../../doubles/blocked-users-repository-fake';
import loggerFake from '../../doubles/logger-fake';

describe('Unit: Domain > Find Blocked User', () => {
  const blockedUserIdFake = '5cbb32fe74fd341eeef9d202';
  it('should return a blocked user', async () => {
    sinon.stub(blockedUsersRepositoryFake, 'findOne')
      .resolves({ cpf: '56235365060', _id: blockedUserIdFake });

    const expected = {
      id: '5cbb32fe74fd341eeef9d202',
      cpf: '562.353.650-60',
    };

    const opts = { id: blockedUserIdFake, logger: loggerFake };
    const blockedUser = await findBlockedUser(blockedUsersRepositoryFake)(opts);

    expect(blockedUsersRepositoryFake.findOne.calledOnceWith({ id: blockedUserIdFake }))
      .to.be.equal(true);
    expect(blockedUser).to.deep.equal(expected);
  });

  it('should return null when there\'s no blockedUser for a given cpf', async () => {
    sinon.stub(blockedUsersRepositoryFake, 'findOne')
      .resolves(null);

    const opts = { id: blockedUserIdFake, logger: loggerFake };
    const blockedUser = await findBlockedUser(blockedUsersRepositoryFake)(opts);

    expect(blockedUsersRepositoryFake.findOne.calledOnceWith({ id: blockedUserIdFake }))
      .to.be.equal(true);
    expect(blockedUser).to.be.equal(null);
  });
});
