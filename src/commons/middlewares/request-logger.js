import onFinished from 'on-finished';
import onHeaders from 'on-headers';

const requestLogger = (loggerAdapter) => {
  const getResponseTime = (req, res, digits = 2) => {
    // calculate diff
    const ms = ((res.startAt[0] - req.startAt[0]) * 1e3)
      + ((res.startAt[1] - req.startAt[1]) * 1e-6);

    // return truncated value
    return ms.toFixed(digits);
  };

  function recordStartTime() {
    this.startAt = process.hrtime();
  }

  const requestLoggerMiddleware = (req, res, next) => {
    const logger = loggerAdapter || res.locals.logger;

    if (!logger) {
      throw Error('The \'loggerAdapter\' parameter was not provided');
    }

    // request and response start time
    req.startAt = undefined;
    res.startAt = undefined;

    recordStartTime.call(req);

    const logRequest = () => logger.info({ req }, 'Request');

    const logResponse = () => {
      res.responseTime = getResponseTime(req, res);
      logger.info({ res }, 'Response');
    };

    logRequest();

    // record response start
    onHeaders(res, recordStartTime);

    // log response when finished
    onFinished(res, logResponse);

    next();
  };

  return requestLoggerMiddleware;
};

export default requestLogger;
