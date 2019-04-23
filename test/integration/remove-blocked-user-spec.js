import { blockedUsersRepository } from '../../src/repository';
import createBlockedUser from './create-blocked-user-helper';

const RESOURCE = '/blockedUsers';

describe('Integration: Remove Blocked User', () => {
  it('should return not found (404) on absent blocked user', async () => {
    const response = await request
      .delete(`${RESOURCE}/5cbe6ad9ef72fa16571304e5`)
      .send();

    expect(response.body).to.have.property('status_message', 'Not Found');
    expect(response.body).to.have.property('status_code', 404);
    expect(response.status).to.equal(404);
    expect(response.body).to.have.property('message', 'BlockedUser not found');
  });

  it('should return bad request (400) for invalid id', async () => {
    const invalidId = '3456';
    const response = await request
      .delete(`${RESOURCE}/${invalidId}`)
      .send();

    expect(response.body).to.have.property('status_message', 'Bad Request');
    expect(response.body).to.have.property('status_code', 400);
    expect(response.status).to.equal(400);
    expect(response.body).to.have
      .property('message', 'child "id" fails because [Id must be a string of 24 hex characters]');
  });

  it('should remove a blocked user ', async () => {
    const expected = await createBlockedUser('66626232028');

    const response = await request
      .delete(`${RESOURCE}/${expected.id}`)
      .send();

    expect(response.status).to.be.equal(204);

    const blockedUser = await blockedUsersRepository.findOne({ id: expected.id });

    expect(blockedUser).to.be.equal(null);
  });
});
