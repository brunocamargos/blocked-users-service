import Boom from 'boom';

const validateBody = (schema, validateSchema) => (req, res, next) => {
  const payload = req.body;
  const validationError = validateSchema(schema, payload);

  if (validationError) {
    return next(Boom.badRequest(validationError.message, validationError.details));
  }

  return next();
};

export default validateBody;
