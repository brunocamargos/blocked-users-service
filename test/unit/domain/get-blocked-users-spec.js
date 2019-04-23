import getBlockedUser from '../../../src/domain/get-blocked-users';
import blockedUsersRepositoryFake from '../../doubles/blocked-users-repository-fake';

describe('Unit: Domain > Get Blocked Users', () => {
  it('should return all blocked users', async () => {
    sinon.stub(blockedUsersRepositoryFake, 'findAll')
      .resolves([
        { cpf: '56235365063', _id: '5cbb32fe74fd341eeef9d201' },
        { cpf: '56235365060', _id: '5cbb32fe74fd341eeef9d202' }]);

    const expected = [
      {
        id: '5cbb32fe74fd341eeef9d201',
        cpf: '562.353.650-63',
      },
      {
        id: '5cbb32fe74fd341eeef9d202',
        cpf: '562.353.650-60',
      },
    ];

    const blockedUsers = await getBlockedUser(blockedUsersRepositoryFake)({});

    expect(blockedUsersRepositoryFake.findAll.calledOnceWith({})).to.be.equal(true);
    expect(blockedUsers).to.have.lengthOf(2);
    expect(blockedUsers).to.deep.equal(expected);
  });

  it('should return all blocked users filtered by CPF', async () => {
    const cpf = '56235365063';
    sinon.stub(blockedUsersRepositoryFake, 'findAll')
      .resolves([{ cpf, _id: '5cbb32fe74fd341eeef9d201' }]);

    const expected = [
      {
        id: '5cbb32fe74fd341eeef9d201',
        cpf: '562.353.650-63',
      },
    ];

    const blockedUsers = await getBlockedUser(blockedUsersRepositoryFake)({ cpf });

    expect(blockedUsersRepositoryFake.findAll.calledOnceWith({ cpf })).to.be.equal(true);
    expect(blockedUsers).to.have.lengthOf(1);
    expect(blockedUsers).to.deep.equal(expected);
  });
});
