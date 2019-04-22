import unblockUser from '../../../src/domain/unblock-user';
import blockedUsersRepositoryFake from '../../doubles/blocked-users-repository-fake';
import loggerFake from '../../doubles/logger-fake';

describe('Unit: Domain > Unblock User', () => {
  const cpf = '56235365063';

  it('should unblock a given user', async () => {
    sinon.stub(blockedUsersRepositoryFake, 'remove')
      .resolves({ n: 1, ok: 1 });

    const unblockedUsersCount = await unblockUser(blockedUsersRepositoryFake)(cpf, loggerFake);

    expect(unblockedUsersCount).to.be.equal(1);
    expect(blockedUsersRepositoryFake.remove.calledOnceWith({ cpf })).to.be.equal(true);
  });

  it('should throw exception when remove fails', async () => {
    const mongoError = Error('Simulate mongo error');
    sinon.stub(blockedUsersRepositoryFake, 'remove').rejects(mongoError);

    await expect(unblockUser(blockedUsersRepositoryFake)(cpf, loggerFake))
      .to.be.rejectedWith(mongoError);
  });
});
