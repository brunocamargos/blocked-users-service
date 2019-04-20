import { blockUser } from '../domain';

const addBlockedUser = async (req, res, next) => {
  const { cpf } = req.body;

  await blockUser(cpf);

  res.status(201).json();
  return next();
};

export default addBlockedUser;
