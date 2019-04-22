import { format as formatCPF } from 'gerador-validador-cpf';

import validateCPF from './validate-cpf';

const getBlockedUsers = repository => async ({ cpf, logger = console }) => {
  let filter = {};

  if (cpf) {
    validateCPF(cpf, logger);
    filter = { cpf };
  }

  const blockedUsers = await repository.findAll(filter);

  return blockedUsers.map(item => ({
    id: item._id,
    cpf: formatCPF(item.cpf),
  }));
};

export default getBlockedUsers;
