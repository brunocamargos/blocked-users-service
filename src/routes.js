import express from 'express';

import wrapAsyncError from './commons/async-wrapper-error';
import validateBody from './commons/body-payload-validator';
import {
  addBlockedUser,
  removeBlockedUser,
  blockedUserPayloadSchema,
  listBlockedUsers,
  healthCheck,
} from './controllers';

const RESOURCE = '/blockedUsers';

const searchCounterMiddleware = (req, res, next) => {
  const COUNT_INCREMENT = 1;
  req.app.locals.searchCount += COUNT_INCREMENT;
  next();
};

const router = express.Router();

router.post(RESOURCE,
  validateBody(blockedUserPayloadSchema), wrapAsyncError(addBlockedUser));

router.get(RESOURCE, searchCounterMiddleware, wrapAsyncError(listBlockedUsers));

router.delete(RESOURCE,
  validateBody(blockedUserPayloadSchema), wrapAsyncError(removeBlockedUser));

router.get('/healthCheck', wrapAsyncError(healthCheck));

export default router;
