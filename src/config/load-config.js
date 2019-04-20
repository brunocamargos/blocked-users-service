const loadConfig = (configSchema, data, validator) => {
  const { error, value: envVars } = validator.validate(data, configSchema, { abortEarly: false });
  if (error) {
    throw new Error(`Environment's variable validation error: ${error.message}`);
  }

  return {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    name: envVars.NAME,
    db: {
      url: envVars.DB_URL,
    },
    logger: {
      name: envVars.NAME,
      level: envVars.LOGGER_LEVEL,
    },
  };
};

export default loadConfig;
