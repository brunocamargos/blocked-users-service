import reqSerializerFactory from '../../../../../src/commons/logger/serializers/request-serializer';

describe('Unit: Commons > Logger > Serializers > Request Serializer', () => {
  let reqSerializer;
  const standardRequestSerialized = { method: 'post' };

  before(() => {
    const standardRequestSerializer = () => (standardRequestSerialized);
    reqSerializer = reqSerializerFactory(standardRequestSerializer);
  });

  it('should return a function', () => {
    expect(reqSerializer).to.be.a('function');
  });

  it('should return empty object when \'req\' parameter is not informed', () => {
    expect(reqSerializer()).to.deep.equal({});
  });

  it('should serialize empty request object', () => {
    const expected = { httpVersion: undefined, ...standardRequestSerialized };
    expect(reqSerializer({})).to.deep.equal(expected);
  });

  it('should serialize request', () => {
    const reqFake = {
      httpVersion: 1,
      blah: 3,
    };
    const expected = {
      httpVersion: reqFake.httpVersion,
      ...standardRequestSerialized,
    };
    expect(reqSerializer(reqFake)).to.deep.equal(expected);
  });
});
