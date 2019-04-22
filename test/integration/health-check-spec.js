const HEALTH_CHECK_RESOURCE = '/healthCheck';
const BLOCKED_USERS_RESOURCE = '/blockedUsers';

describe('Integration: Health Check', () => {
  it('should return status ok', async () => {
    // 1 User blocked
    await request
      .post(BLOCKED_USERS_RESOURCE)
      .send({ cpf: '56235365063' });

    // 1 Search
    await request
      .get(BLOCKED_USERS_RESOURCE)
      .send();

    const response = await request
      .get(HEALTH_CHECK_RESOURCE)
      .send();

    expect(response.status).to.be.equal(200);
    expect(response.body).to.have.property('uptime');
    expect(response.body).to.have.property('search_count', 1);
    expect(response.body).to.have.property('blocked_users_count', 1);
  });
});
