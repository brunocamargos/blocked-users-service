import boom from 'boom';

import { findBlockedUser } from '../domain';

const getBlockedUser = async (req, res, next) => {
  const { id } = req.params;

  const blockedUser = await findBlockedUser({ id, logger: res.locals.logger });

  if (!blockedUser) {
    return next(boom.notFound('BlockedUser not found'));
  }

  res.status(200).json(blockedUser);
  return next();
};

export default getBlockedUser;
