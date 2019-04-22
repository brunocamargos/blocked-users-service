import express from 'express';

import wrapAsyncError from './commons/async-wrapper-error';
import validateBody from './commons/body-payload-validator';
import {
  addBlockedUser,
  addBlockedUserPayloadSchema,
  listBlockedUsers,
} from './controllers';

const router = express.Router();

const RESOURCE = '/blockedUsers';

router.post(RESOURCE,
  validateBody(addBlockedUserPayloadSchema),
  wrapAsyncError(addBlockedUser));

router.get(RESOURCE,
  wrapAsyncError(listBlockedUsers));

export default router;
