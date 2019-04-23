import unblockUser from '../../../src/domain/unblock-user';
import blockedUsersRepositoryFake from '../../doubles/blocked-users-repository-fake';
import loggerFake from '../../doubles/logger-fake';

describe('Unit: Domain > Unblock User', () => {
  const id = '5cbb32fe74fd341eeef9d202';

  it('should unblock a given user', async () => {
    sinon.stub(blockedUsersRepositoryFake, 'remove')
      .resolves({ n: 1, ok: 1 });

    const unblockedUsersCount = await unblockUser(blockedUsersRepositoryFake)(id, loggerFake);

    expect(unblockedUsersCount).to.be.equal(1);
    expect(blockedUsersRepositoryFake.remove.calledOnceWith({ id })).to.be.equal(true);
  });

  it('should not unblock when there\'s no blocked user', async () => {
    sinon.stub(blockedUsersRepositoryFake, 'remove')
      .resolves({ n: 0, ok: 1 });

    const unblockedUsersCount = await unblockUser(blockedUsersRepositoryFake)(id, loggerFake);

    expect(unblockedUsersCount).to.be.equal(0);
    expect(blockedUsersRepositoryFake.remove.calledOnceWith({ id })).to.be.equal(true);
  });
});
