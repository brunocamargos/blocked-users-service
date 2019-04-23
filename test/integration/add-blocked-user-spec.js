import { blockedUsersRepository } from '../../src/repository';

const RESOURCE = '/blockedUsers';

const assertBadRequest = (response, message) => {
  expect(response.body).to.have.property('status_message', 'Bad Request');
  expect(response.body).to.have.property('status_code', 400);
  expect(response.status).to.equal(400);
  expect(response.body).to.have.property('message', message);
};

describe('Integration: Add Blocked User', () => {
  it('should return bad request (400) for invalid cpf (schema validator)', async () => {
    const response = await request
      .post(RESOURCE)
      .send({ cpf: '966' });

    const expectedMessage = 'child "cpf" fails because ["cpf" must be 11 characters long and contain only numbers]';

    assertBadRequest(response, expectedMessage);
  });

  it('should insert a new blocked user', async () => {
    const cpf = '56235365063';
    const response = await request
      .post(RESOURCE)
      .send({ cpf });

    expect(response.status).to.be.equal(201);

    const blockedUser = await blockedUsersRepository.findOne({ cpf });

    expect(response.header.location).to.be.equal(`${RESOURCE}/${blockedUser._id}`);
    expect(blockedUser).to.have.property('cpf', cpf);
  });

  it('should return bad request (400) for user already blocked', async () => {
    const cpf = '66626232029';
    await blockedUsersRepository.insertOne({ cpf });

    const response = await request
      .post(RESOURCE)
      .send({ cpf });

    const expectedMessage = 'User already blocked';
    assertBadRequest(response, expectedMessage);
  });

  it('should return bad request (400) for invalid cpf (CPF validator)', async () => {
    const cpf = '56235365061';

    const response = await request
      .post(RESOURCE)
      .send({ cpf });

    const expectedMessage = 'Invalid CPF';
    assertBadRequest(response, expectedMessage);
  });
});
