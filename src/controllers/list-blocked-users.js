import boom from 'boom';

import { getBlockedUsers } from '../domain';

const listBlockedUsers = async (req, res, next) => {
  const { cpf } = req.query;
  let blockedUsers;
  try {
    blockedUsers = await getBlockedUsers({ cpf, logger: res.locals.logger });
  } catch (err) {
    const INVALID_CPF_ERROR_CODE = 'invalid-cpf';

    if (err.code === INVALID_CPF_ERROR_CODE) {
      return next(boom.badRequest('Invalid CPF'));
    }

    return next(err);
  }

  if (!blockedUsers.length) {
    return next(boom.notFound('BlockedUser not found'));
  }

  res.status(200).json(blockedUsers);
  return next();
};

export default listBlockedUsers;
