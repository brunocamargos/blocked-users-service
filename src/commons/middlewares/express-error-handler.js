const errorFactory = ({
  statusMessage = 'Internal Server Error',
  statusCode = 500,
  message = null,
  details,
}) => ({
  status_message: statusMessage,
  status_code: statusCode,
  message,
  details: details || [],
});

const formatError = (err) => {
  if (err.isBoom) {
    const { error: statusMessage, message, statusCode } = err.output.payload;
    return errorFactory({
      statusMessage,
      statusCode,
      message,
      details: err.data,
    });
  }

  return errorFactory({});
};

const logError = (err, logger) => {
  if (err.isBoom) {
    return logger.error({ err }, 'Expected exception');
  }

  return logger.error({ err }, 'Unexpected exception');
};

const handleError = (err, req, res, next) => {
  logError(err, res.locals.logger);

  const formattedError = formatError(err);
  res.status(formattedError.status_code).json(formattedError);

  next();
};

export default handleError;
export { errorFactory, formatError, logError };
