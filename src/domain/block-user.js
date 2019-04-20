import { blockedUsersRepository } from '../repository';

const blockUser = async (cpf) => {
  const result = await blockedUsersRepository.insertOne({ cpf });
  return result;
};

export default blockUser;
