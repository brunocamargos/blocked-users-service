import Joi from 'joi';

const addBlockedUserPayloadSchema = Joi.object({
  cpf: Joi.string().required().regex(/^[0-9]{11}$/)
    .error(() => '"cpf" must be 11 characters long and contain only numbers'),
});

export default addBlockedUserPayloadSchema;
