import { validate as isValidCPF } from 'gerador-validador-cpf';

const validateCPF = (cpf) => {
  if (!isValidCPF(cpf)) {
    const invalidCPFError = new Error('Invalid CPF');
    invalidCPFError.code = 'invalid-cpf';
    throw invalidCPFError;
  }
};

export default validateCPF;
