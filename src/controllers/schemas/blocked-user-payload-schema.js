import Joi from 'joi';

const addBlockedUserPayloadSchema = Joi.object({
  cpf: Joi.string().length(11).regex(/^[0-9]+$/).required(),
});

export default addBlockedUserPayloadSchema;
