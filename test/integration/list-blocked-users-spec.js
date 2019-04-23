import createBlockedUser from './create-blocked-user-helper';

const RESOURCE = '/blockedUsers';

describe('Integration: List Blocked Users', () => {
  it('should return all blocked users', async () => {
    const expected = [
      await createBlockedUser('66626232028'),
      await createBlockedUser('66626232029'),
    ];

    const response = await request
      .get(RESOURCE)
      .send();

    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal(expected);
  });

  it('should return all blocked users filtered by cpf', async () => {
    await createBlockedUser('66626232028');

    const cpf = '66626232029';
    const expected = [
      await createBlockedUser(cpf),
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

  it('should return empty when there\' no blocked user', async () => {
    const cpf = '66626232029';
    const response = await request
      .get(`${RESOURCE}/?cpf=${cpf}`)
      .send();

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal([]);
  });
});
