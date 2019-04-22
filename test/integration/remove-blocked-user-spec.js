import { blockedUsersRepository } from '../../src/repository';

const RESOURCE = '/blockedUsers';

describe('Integration: Remove Blocked User', () => {
  const cpf = '54112745400';
  it('should not remove an absent blocked user', async () => {
    const response = await request
      .delete(RESOURCE)
      .send({ cpf });

    expect(response.status).to.be.equal(404);
  });

  it('should remove a blocked user ', async () => {
    await blockedUsersRepository.insertOne({ cpf });

    const response = await request
      .delete(RESOURCE)
      .send({ cpf });

    expect(response.status).to.be.equal(204);

    const blockedUser = await blockedUsersRepository.findOne({ cpf });

    expect(blockedUser).to.be.equal(null);
  });
});
