import express from 'express';

import wrapAsyncError from './commons/async-wrapper-error';
import validatePayload, { sourceOptions } from './commons/middlewares/payload-validator';
import {
  addBlockedUser,
  removeBlockedUser,
  blockedUserPayloadSchema,
  listBlockedUsers,
  getBlockedUser,
  mongoIdSchema,
  healthCheck,
} from './controllers';

const BLOCKED_USERS_RESOURCE = '/blockedUsers';

const searchCounterMiddleware = (req, res, next) => {
  const COUNT_INCREMENT = 1;
  req.app.locals.searchCount += COUNT_INCREMENT;
  next();
};

const router = express.Router();

router.post(BLOCKED_USERS_RESOURCE,
  validatePayload(blockedUserPayloadSchema),
  wrapAsyncError(addBlockedUser));

router.get(BLOCKED_USERS_RESOURCE,
  searchCounterMiddleware,
  wrapAsyncError(listBlockedUsers));

router.get(`${BLOCKED_USERS_RESOURCE}/:id`,
  validatePayload(mongoIdSchema, sourceOptions.PARAMS),
  wrapAsyncError(getBlockedUser));

router.delete(BLOCKED_USERS_RESOURCE,
  validatePayload(blockedUserPayloadSchema),
  wrapAsyncError(removeBlockedUser));

router.get('/healthCheck', wrapAsyncError(healthCheck));

export default router;
