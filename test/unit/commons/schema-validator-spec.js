import validateSchema from '../../../src/commons/schema-validator';

describe('Unit: Commons > Schema Validator', () => {
  const schemaStub = {
    validate() { },
  };

  it('should return validation schema error', () => {
    const dataFake = 'error';
    sinon.stub(schemaStub, 'validate').returns({
      error: {
        message: 'Error!',
        details: [
          new Error('Validation Error'),
        ],
      },
    });
    const result = validateSchema(schemaStub, dataFake);

    expect(result).to.be.an('object');
    expect(result).to.have.keys(['message', 'details']);
    expect(result.message).to.be.equal('Error!');
    expect(Array.isArray(result.details)).to.be.equal(true);
    expect(result.details.length).to.be.equal(1);
    expect(result.details[0]).to.have.property('description', 'Validation Error');
    expect(schemaStub.validate.calledOnceWith('error')).to.be.equal(true);
  });

  it('should not return error', () => {
    const dataFake = 'success';
    sinon.stub(schemaStub, 'validate').returns({ error: null });
    const result = validateSchema(schemaStub, dataFake);

    expect(result).to.be.equal(undefined);
    expect(schemaStub.validate.calledOnceWith('success')).to.be.equal(true);
  });
});
