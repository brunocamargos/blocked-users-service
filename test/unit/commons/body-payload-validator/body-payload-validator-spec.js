import Boom from 'boom';
import validateBody from '../../../../src/commons/body-payload-validator/body-payload-validator';

describe('Unit: Commons > Body Payload Validator', () => {
  it('should not return error', () => {
    const reqFake = { body: null };
    const nextSpy = sinon.spy();
    const validateSchemaStub = sinon.stub().returns();
    validateBody({}, validateSchemaStub)(reqFake, {}, nextSpy);

    expect(nextSpy.calledOnceWith()).to.be.equal(true);
    expect(validateSchemaStub.calledOnce).to.be.equal(true);
  });

  it('should return "boom" bad request error', () => {
    const reqFake = { body: {} };
    const nextSpy = sinon.spy();
    const validateSchemaStub = sinon.stub().returns({
      message: 'Error',
      details: [],
    });
    sinon.spy(Boom, 'badRequest');

    validateBody('error', validateSchemaStub)(reqFake, {}, nextSpy);

    expect(nextSpy.calledOnce).to.be.equal(true);
    expect(validateSchemaStub.calledOnce).to.be.equal(true);
    expect(Boom.badRequest.calledOnceWith('Error', [])).to.be.equal(true);
  });
});
