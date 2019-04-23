import createBlockedUser from './create-blocked-user-helper';

const RESOURCE = '/blockedUsers';

describe('Integration: Get a Blocked User by Id', () => {
  it('should return a blocked user', async () => {
    const expected = await createBlockedUser('66626232028');

    const response = await request
      .get(`${RESOURCE}/${expected.id}`)
      .send();

    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal(expected);
  });

  it('should return not found (404)', async () => {
    const response = await request
      .get(`${RESOURCE}/5cbe6ad9ef72fa16571304e5`)
      .send();

    expect(response.body).to.have.property('status_message', 'Not Found');
    expect(response.body).to.have.property('status_code', 404);
    expect(response.status).to.equal(404);
    expect(response.body).to.have.property('message', 'BlockedUser not found');
  });

  it('should return bad request (400) for invalid id', async () => {
    const invalidId = '3456';
    const response = await request
      .get(`${RESOURCE}/${invalidId}`)
      .send();

    expect(response.body).to.have.property('status_message', 'Bad Request');
    expect(response.body).to.have.property('status_code', 400);
    expect(response.status).to.equal(400);
    expect(response.body).to.have
      .property('message', 'child "id" fails because [Id must be a string of 24 hex characters]');
  });
});
