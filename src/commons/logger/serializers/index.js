import bunyan from 'bunyan';

import reqSerializerFactory from './request-serializer';
import resSerializerFactory from './response-serializer';

const reqSerializer = reqSerializerFactory(bunyan.stdSerializers.req);
const resSerializer = resSerializerFactory(bunyan.stdSerializers.res);

export { reqSerializer, resSerializer };
