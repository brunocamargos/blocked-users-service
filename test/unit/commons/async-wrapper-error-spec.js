import wrapError from '../../../src/commons/async-wrapper-error';

const fnSuccess = async () => Promise.resolve('Ok');
const fnError = async () => Promise.reject(new Error('Error!'));

describe('Unit: Commons > Async Wrapper Error', () => {
  it('should not throws error', async () => {
    const result = await wrapError(fnSuccess)();
    expect(result).to.be.equal('Ok');
  });

  it('should throws error', async () => {
    await wrapError(fnError)(null, null, (err) => {
      expect(err).to.be.an('error');
      expect(err.message).to.be.equal('Error!');
    });
  });
});
