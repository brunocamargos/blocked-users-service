import * as validator from 'gerador-validador-cpf';

import validateCPF from '../../../src/domain/validate-cpf';

describe('Unit: Domain > Validate CPF', () => {
  it('should pass when cpf is valid', () => {
    sinon.stub(validator, 'validate').returns(true);
    expect(validateCPF('56235365063')).to.be.equal(undefined);
  });

  it('should throw invalid cpf exception', () => {
    sinon.stub(validator, 'validate').returns(false);
    expect(() => validateCPF('invalid-cpf')).to.throw(Error, 'Invalid CPF');
  });
});
