import validateCPF from './validate-cpf';

const blockUser = repository => async (cpf, logger = console) => {
  const DB_DUPLICATE_KEY_ERROR_CODE = 11000;
  let blockedUser;

  validateCPF(cpf);

  try {
    blockedUser = await repository.insertOne({ cpf });
  } catch (err) {
    logger.error({ err }, `Unable to insert a new blocked User (${cpf})`);

    if (err.code === DB_DUPLICATE_KEY_ERROR_CODE) {
      const duplicateKeyError = new Error('User already blocked');
      duplicateKeyError.code = 'duplicate-key';
      throw duplicateKeyError;
    }

    throw err;
  }

  return blockedUser;
};

export default blockUser;
