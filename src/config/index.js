import joi from 'joi';
import loadConfig from './load-config';
import configSchema from './config-schema';

const config = loadConfig(configSchema, process.env, joi);

export default config;
