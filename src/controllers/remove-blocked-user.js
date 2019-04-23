import boom from 'boom';

import { unblockUser } from '../domain';

const removeBlockedUser = async (req, res, next) => {
  const { id } = req.params;

  const unblockedUsersCount = await unblockUser(id);

  if (!unblockedUsersCount) {
    return next(boom.notFound('BlockedUser not found'));
  }

  res.status(204).json();
  return next();
};

export default removeBlockedUser;
