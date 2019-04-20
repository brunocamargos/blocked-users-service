import chai from 'chai';
import sinon from 'sinon';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);

global.expect = chai.expect;
global.sinon = sinon;

console.log('*******************');
