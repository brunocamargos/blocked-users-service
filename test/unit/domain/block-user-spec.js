import { blockUser } from '../../../src/domain/index';
import { blockedUsersRepository } from '../../../src/repository';

describe('Unit: Domain > Block User', () => {
  it('should block a given user', async () => {
    const insertOneStub = sinon.stub();
    blockedUsersRepository.insertOne = insertOneStub;

    const cpf = '2320982309823';
    insertOneStub.resolves({ cpf, _id: '5cbb32fe74fd341eeef9d201' });

    const result = await blockUser(cpf);

    expect(insertOneStub.calledOnceWith({ cpf })).to.be.equal(true);
    expect(result).to.have.property('cpf', cpf);
  });

  // it('should return 201 status code and send message without token', async () => {
  //   const reqFake = {
  //     body: {
  //       notification: {},
  //     },
  //   };
  //   await createNotification(reqFake, resStub, nextSpy);

  //   expect(nextSpy.calledOnce).to.be.equal(true);
  //   expect(sendMessageSpy.calledOnceWith('logger', { notification: {} })).to.deep.equal(true);
  //   expect(statusStub.calledWith(201)).to.be.equal(true);
  //   expect(jsonSpy.calledOnce).to.be.equal(true);
  // });

  // it('should return "boom" error when token not found', async () => {
  //   const reqFake = {
  //     body: {
  //       user_id: 'not-found',
  //       notification: {},
  //     },
  //   };
  //   findOneStub.resolves(null);
  //   await createNotification(reqFake, resStub, nextSpy);

  //   expect(nextSpy.calledOnce).to.be.equal(true);
  //   expect(notFoundSpy.calledOnceWith('Token not found for userId \'not-found\'')).to.be.equal(true);
  // });
});
