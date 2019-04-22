import express from 'express';

import wrapAsyncError from './commons/async-wrapper-error';
import validateBody from './commons/body-payload-validator';
import { addBlockedUser, addBlockedUserPayloadSchema } from './controllers';

const router = express.Router();

router.post('/blockedUsers',
  validateBody(addBlockedUserPayloadSchema),
  wrapAsyncError(addBlockedUser));

// router.post('/clientes/:cpf/fichas',
//   validateBody(schedulingPayloadSchema),
//   wrapAsyncError(createScheduling));

export default router;
