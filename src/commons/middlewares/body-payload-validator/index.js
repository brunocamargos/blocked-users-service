import validateBody from './body-payload-validator';
import validateSchema from './schema-validator';

const validatorFactory = schema => validateBody(schema, validateSchema);

export default validatorFactory;
export {
  validateSchema,
};
