import joi from 'joi';
import loadConfig from '../../../src/config/load-config';

describe('Unit: Config > Load Config', () => {
  const configSchema = joi.object({
    NODE_ENV: joi.string(),
    PORT: joi.string().required(),
  }).unknown().required();

  it('should return a valid object', () => {
    const validData = {
      PORT: '3000',
      NODE_ENV: 'test',
    };
    const validateStub = sinon.stub().returns({ value: validData });
    const fakeValidator = { validate: validateStub };

    const config = loadConfig(configSchema, validData, fakeValidator);

    expect(config).to.be.an('object');
    expect(config).to.have.property('port', validData.PORT);
    expect(config).to.have.property('env', validData.NODE_ENV);

    expect(validateStub.calledOnceWith(validData, configSchema))
      .to.be.equal(true);
  });

  it('should throw error when passing invalid values', () => {
    const invalidData = {
      PORT: 3000,
      NODE_ENV: 'test',
    };
    const error = { message: 'Error from test' };
    const validateStub = sinon.stub().returns({ error });
    const fakeValidator = { validate: validateStub };

    const config = loadConfig.bind(null, configSchema, invalidData, fakeValidator);

    expect(config).to.throw(Error);

    expect(validateStub.calledOnceWith(invalidData, configSchema))
      .to.be.equal(true);
  });
});
