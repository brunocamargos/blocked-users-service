import Joi from 'joi';

const mongoIdSchema = Joi.object({
  id: Joi.string().required().regex(/^[0-9a-fA-F]{24}$/)
    .error(() => 'Id must be a string of 24 hex characters'),
});

export default mongoIdSchema;
