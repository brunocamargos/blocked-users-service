import { format as formatCPF } from 'gerador-validador-cpf';

import { blockedUsersRepository } from '../../src/repository';

const RESOURCE = '/blockedUsers';

const insertBlockedUsers = async (cpf) => {
  const blockedUser = await blockedUsersRepository.insertOne({ cpf });
  return {
    id: blockedUser._id.toString(),
    cpf: formatCPF(blockedUser.cpf),
  };
};

describe('Integration: List Blocked Users', () => {
  it('should return all blocked users', async () => {
    const expected = [
      await insertBlockedUsers('66626232028'),
      await insertBlockedUsers('66626232029'),
    ];

    const response = await request
      .get(RESOURCE)
      .send();

    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal(expected);
  });

  it('should return all blocked users for a given cpf', async () => {
    await insertBlockedUsers('66626232028');

    const cpf = '66626232029';
    const expected = [
      await insertBlockedUsers(cpf),
    ];

    const response = await request
      .get(`${RESOURCE}/?cpf=${cpf}`)
      .send();

    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal(expected);
  });

  it('should return bad request (400) for invalid cpf', async () => {
    const cpf = '56235365061';

    const response = await request
      .get(`${RESOURCE}/?cpf=${cpf}`)
      .send();

    expect(response.body).to.have.property('status_message', 'Bad Request');
    expect(response.body).to.have.property('status_code', 400);
    expect(response.status).to.equal(400);
    expect(response.body).to.have.property('message', 'Invalid CPF');
  });

  it('should return not found (404)', async () => {
    const cpf = '66626232029';
    const response = await request
      .get(`${RESOURCE}/?cpf=${cpf}`)
      .send();

    expect(response.body).to.have.property('status_message', 'Not Found');
    expect(response.body).to.have.property('status_code', 404);
    expect(response.status).to.equal(404);
    expect(response.body).to.have.property('message', 'BlockedUser not found');
  });
});
