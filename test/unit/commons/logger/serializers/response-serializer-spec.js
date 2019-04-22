import resSerializerFactory from '../../../../../src/commons/logger/serializers/response-serializer';

describe('Unit: Commons > Logger > Serializers > Response Serializer', () => {
  let resSerializer;
  const standardResponseSerialized = { statusCode: 200 };

  before(() => {
    const standardResponseSerializer = () => (standardResponseSerialized);
    resSerializer = resSerializerFactory(standardResponseSerializer);
  });

  it('should return a function', () => {
    expect(resSerializer).to.be.a('function');
  });

  it('should return empty object when \'res\' parameter is not passed', () => {
    expect(resSerializer()).to.deep.equal({});
  });

  it('should serialize empty response object', () => {
    const expected = { responseTime: undefined, ...standardResponseSerialized };
    expect(resSerializer({})).to.deep.equal(expected);
  });

  it('should serialize response', () => {
    const resFake = {
      statusCode: 200,
      responseTime: 22.67,
      blah: 3,
    };
    const expected = {
      statusCode: resFake.statusCode,
      responseTime: `${resFake.responseTime}ms`,
      ...standardResponseSerialized,
    };
    expect(resSerializer(resFake)).to.deep.equal(expected);
  });
});
