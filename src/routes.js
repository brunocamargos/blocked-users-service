import express from 'express';

import wrapAsyncError from './commons/async-wrapper-error';
import validateBody from './commons/body-payload-validator';
import {
  addBlockedUser,
  addBlockedUserPayloadSchema,
  listBlockedUsers,
  healthCheck,
} from './controllers';

const router = express.Router();

const RESOURCE = '/blockedUsers';

const searchCounterMiddleware = (req, res, next) => {
  const COUNT_INCREMENT = 1;
  req.app.locals.searchCount += COUNT_INCREMENT;
  next();
};

router.post(RESOURCE,
  validateBody(addBlockedUserPayloadSchema), wrapAsyncError(addBlockedUser));

router.get(RESOURCE, searchCounterMiddleware, wrapAsyncError(listBlockedUsers));

router.get('/healthCheck', wrapAsyncError(healthCheck));

export default router;
