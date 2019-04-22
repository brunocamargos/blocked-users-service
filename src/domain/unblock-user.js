import validateCPF from './validate-cpf';

const unblockUser = repository => async (cpf, logger = console) => {
  let result;
  validateCPF(cpf);

  try {
    result = await repository.remove({ cpf });
  } catch (err) {
    logger.error({ err }, `Unable to remove a blocked User (${cpf})`);
    throw err;
  }

  return result.n;
};

export default unblockUser;
