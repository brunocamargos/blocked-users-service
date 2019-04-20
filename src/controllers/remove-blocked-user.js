import { blockUser } from '../domain';

const removeBlockedUser = async (req, res, next) => {
  const { cpf } = req.body;

  await blockUser(cpf);

  res.status(201).json();
  return next();
};

export default removeBlockedUser;
