import dbClient from '../commons/db';

const healthCheck = async (req, res, next) => {
  let dbStatus = 'ok';
  let blockedUsersCount;

  try {
    blockedUsersCount = await dbClient.db.collection('blockedUsers').countDocuments();
  } catch (err) {
    dbStatus = 'nok';
    res.locals.logger.error({ err }, 'Unable to reach DB to get the number of blocked users');
  }

  const health = {
    pid: process.pid,
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    search_count: req.app.locals.searchCount,
    blocked_users_count: blockedUsersCount,
    db_status: dbStatus,
  };

  res.status(200).json(health);
  return next();
};

export default healthCheck;
