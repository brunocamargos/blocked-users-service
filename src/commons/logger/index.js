import bunyan from 'bunyan';

import { reqSerializer, resSerializer } from './serializers';

const logger = ({ name, level }) => {
  const configOptions = {
    name,
    level,
    streams: [{ stream: process.stdout }],
    serializers: {
      err: bunyan.stdSerializers.err,
      req: reqSerializer,
      res: resSerializer,
    },
  };

  return bunyan.createLogger(configOptions);
};

export default logger;
