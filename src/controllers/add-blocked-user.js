import boom from 'boom';

import { blockUser } from '../domain';

const addBlockedUser = async (req, res, next) => {
  const { cpf } = req.body;

  let blockedUser;
  try {
    blockedUser = await blockUser(cpf, res.locals.logger);
  } catch (err) {
    const DUPLICATE_KEY_ERROR_CODE = 'duplicate-key';
    const INVALID_CPF_ERROR_CODE = 'invalid-cpf';

    if (err.code === DUPLICATE_KEY_ERROR_CODE) {
      return next(boom.badRequest('User already blocked'));
    }

    if (err.code === INVALID_CPF_ERROR_CODE) {
      return next(boom.badRequest('Invalid CPF'));
    }

    return next(err);
  }

  res.location(`/blockedUsers/${blockedUser._id}`);
  res.status(201).json();
  return next();
};

export default addBlockedUser;
