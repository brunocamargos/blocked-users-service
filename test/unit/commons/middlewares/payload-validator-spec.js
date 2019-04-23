import boom from 'boom';
import validatePayload from '../../../../src/commons/middlewares/payload-validator/validate-payload';

describe('Unit: Commons > Middlewares > Payload Validator', () => {
  it('should not return error', () => {
    const reqFake = { body: null };
    const nextSpy = sinon.spy();
    const validateSchemaStub = sinon.stub().returns();
    validatePayload({}, validateSchemaStub)(reqFake, {}, nextSpy);

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
    sinon.spy(boom, 'badRequest');

    validatePayload('error', validateSchemaStub)(reqFake, {}, nextSpy);

    expect(nextSpy.calledOnce).to.be.equal(true);
    expect(validateSchemaStub.calledOnce).to.be.equal(true);
    expect(boom.badRequest.calledOnceWith('Error', [])).to.be.equal(true);
  });
});
