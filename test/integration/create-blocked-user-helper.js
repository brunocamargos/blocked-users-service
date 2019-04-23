import { format as formatCPF } from 'gerador-validador-cpf';

import { blockedUsersRepository } from '../../src/repository';

const createBlockedUser = async (cpf) => {
  const blockedUser = await blockedUsersRepository.insertOne({ cpf });
  return {
    id: blockedUser._id.toString(),
    cpf: formatCPF(blockedUser.cpf),
  };
};

export default createBlockedUser;
