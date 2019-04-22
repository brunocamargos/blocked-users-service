import Joi from 'joi';

const addBlockedUserPayloadSchema = Joi.object({
  cpf: Joi.string().length(11).regex(/^[0-9]+$/).required(),
  data: Joi.object().unknown().pattern(/\w+/, Joi.string()),
});

export default addBlockedUserPayloadSchema;
