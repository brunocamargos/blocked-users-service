import handlerError, { errorFactory, logError, formatError } from '../../../../src/commons/middlewares/express-error-handler';

const errorObjectKeys = ['status_message', 'status_code', 'message', 'details'];

const loggerErrorSpy = sinon.spy();

const assertErrorObject = (result, expected) => {
  expect(result).to.be.an('object');
  expect(result).to.have.keys(errorObjectKeys);
  expect(result).to.deep.equal(expected);
};

describe('Unit: Commons > Middlewares > Express Error Handler', () => {
  context('errorFactory', () => {
    it('should return object with default data', () => {
      const result = errorFactory({});
      const expected = {
        status_message: 'Internal Server Error',
        status_code: 500,
        message: null,
        details: [],
      };
      assertErrorObject(result, expected);
    });

    it('should return object with custom data', () => {
      const result = errorFactory({
        statusMessage: 'Test Error',
        statusCode: 400,
        message: 'Test Error',
        details: ['Error detail'],
      });
      const expected = {
        status_message: 'Test Error',
        status_code: 400,
        message: 'Test Error',
        details: ['Error detail'],
      };
      assertErrorObject(result, expected);
    });
  });

  context('formatError', () => {
    it('should return object with default data', () => {
      const result = formatError({});
      const expected = {
        status_message: 'Internal Server Error',
        status_code: 500,
        message: null,
        details: [],
      };
      assertErrorObject(result, expected);
    });

    it('should return object with custom data', () => {
      const result = formatError({
        isBoom: true,
        output: {
          payload: {
            error: 'Error',
            statusCode: 400,
            message: 'Test Error',
          },
        },
        data: ['Error detail'],
      });
      const expected = {
        status_message: 'Error',
        status_code: 400,
        message: 'Test Error',
        details: ['Error detail'],
      };
      assertErrorObject(result, expected);
    });
  });

  context('logError', () => {
    beforeEach(() => {
      loggerErrorSpy.resetHistory();
    });

    it('should log "Expected exception"', () => {
      const errFake = { isBoom: true, message: 'Boom' };
      logError(errFake, { error: loggerErrorSpy });
      expect(loggerErrorSpy.calledOnce).to.be.equal(true);
      expect(loggerErrorSpy.args[0][1]).to.be.equal('Expected exception');
    });

    it('should log "Unexpected exception"', () => {
      const errFake = { message: 'Boom' };
      logError(errFake, { error: loggerErrorSpy });
      expect(loggerErrorSpy.calledOnce).to.be.equal(true);
      expect(loggerErrorSpy.args[0][1]).to.be.equal('Unexpected exception');
    });
  });

  context('handleError', () => {
    const nextSpy = sinon.spy();
    const jsonSpy = sinon.spy();
    const statusStub = sinon.stub().returns({
      json: jsonSpy,
    });
    const resStub = {
      locals: {
        logger: {
          error: sinon.spy(),
        },
      },
      status: statusStub,
    };

    it('should return response with formatted error', () => {
      const formattedErrorExpected = {
        status_message: 'Internal Server Error',
        status_code: 500,
        message: null,
        details: [],
      };
      handlerError({}, {}, resStub, nextSpy);

      expect(nextSpy.calledOnce).to.be.equal(true);
      expect(statusStub.calledOnceWith(500)).to.be.equal(true);
      expect(jsonSpy.calledOnceWith(formattedErrorExpected)).to.be.equal(true);
    });
  });
});
