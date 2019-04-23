import validatePayload from './validate-payload';
import validateSchema from '../../schema-validator';
import sourceOptions from './source-options';

const validatorFactory = (schema, srcOpts) => validatePayload(schema, validateSchema, srcOpts);

export default validatorFactory;

export { sourceOptions };
