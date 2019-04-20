import express from 'express';

import wrapAsyncError from './commons/async-wrapper-error';
import validateBody from './commons/middlewares/body-payload-validator';

import { addBlockedUser } from './controllers';

const router = express.Router();

router.post('/blockedUsers',
  wrapAsyncError(addBlockedUser));

// router.post('/clientes/:cpf/fichas',
//   validateBody(schedulingPayloadSchema),
//   wrapAsyncError(createScheduling));

export default router;
