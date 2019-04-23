import joi from 'joi';
import { name } from '../../package.json';

export default joi.object({
  NODE_ENV: joi.string()
    .lowercase()
    .valid('test', 'development', 'production')
    .required(),
  DB_URL: joi.string()
    .required(),
  PORT: joi.string()
    .default(8080),
  NAME: joi.string()
    .default(name),
  LOGGER_LEVEL: joi.string()
    .lowercase()
    .valid('fatal', 'error', 'warn', 'info', 'debug', 'trace')
    .required(),
}).unknown().required();
