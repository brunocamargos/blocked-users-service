import { format as formatCPF } from 'gerador-validador-cpf';

const findBlockedUser = repository => async ({ id, logger = console }) => {
  const blockedUser = await repository.findOne({ id });

  if (!blockedUser) {
    logger.warn({ blockedUserId: id }, 'Blocked user not found');
    return null;
  }

  return {
    id: blockedUser._id,
    cpf: formatCPF(blockedUser.cpf),
  };
};

export default findBlockedUser;
