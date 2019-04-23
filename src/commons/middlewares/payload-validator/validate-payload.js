import boom from 'boom';

import sourceOptions from './source-options';

const validatePayload = (schema, validateSchema, srcOptions) => (req, res, next) => {
  const payload = req[srcOptions || sourceOptions.BODY];
  const validationError = validateSchema(schema, payload);

  if (validationError) {
    return next(boom.badRequest(validationError.message, validationError.details));
  }

  return next();
};

export default validatePayload;
