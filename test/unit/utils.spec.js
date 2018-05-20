import { expect } from 'chai';
import sinon from 'sinon';

import { assertOrThrow, errorWrap } from '../../src/utils';

describe('assertOrThrow test suite', () => {
  it('should throw error when assertion fails', () => {
    const fun = () => assertOrThrow(1 + 1 === 3, Error, 'Hello error');
    expect(fun).to.throw(Error, 'Hello error');
  });

  it('should not throw error when assertion passes', () => {
    const fun = () => assertOrThrow(1 + 1 === 2, Error, 'Hello error');
    expect(fun).to.not.throw();
  });
});

describe('errorWrap test suite', () => {
  it('should call next function', async () => {
    const callback = sinon.spy();

    const handler = async (req, res, next) => {
      throw new Error('Hello');
    };

    const decorated = errorWrap(handler);
    decorated(null, null, callback);
    await waitOneTick();
    expect(callback.called).eql(true);
  });

  it('should call next with proper argument', async () => {
    const callback = sinon.spy();

    const handler = async (req, res, next) => {
      throw 'Error';
    };

    const decorated = errorWrap(handler);
    decorated(null, null, callback);
    await waitOneTick();
    expect(callback.calledWith('Error')).eql(true);
  });

  it('should not call next function', async () => {
    const callback = sinon.spy();

    const handler = async (req, res, next) => {
      return;
    };

    const decorated = errorWrap(handler);
    decorated(null, null, callback);
    await waitOneTick();
    expect(callback.notCalled).eql(true);
  });
});

function waitOneTick() {
  return new Promise((resolve) => {
    setTimeout(resolve);
  });
}
