import 'regenerator-runtime/runtime';
import React, { PropTypes } from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import AsyncAwait from '../src/index';

import 'babel-polyfill';

describe('AsyncProps', () => {
  it('calls aync function', done => {
    const Example = ({ title }) => <div>{ title }</div>;

    Example.propTypes = {
      title: PropTypes.string
    };

    const callback = sinon.spy();

    const myAsyncFunc = new Promise(resolve => {
      setTimeout(() => {
        resolve('Hello world !');
        callback();
      }, 300);
    });

    shallow(
      <AsyncAwait>
        { async () => <Example title={ await myAsyncFunc() }/> }
      </AsyncAwait>
    );

    expect(callback).to.have.property('callCount', 0);

    setTimeout(() => {
      expect(callback).to.have.property('callCount', 1);
      done();
    }, 600);
  });

  it('renders default prop', () => {
    const wrapper = shallow(
      <AsyncAwait default={ <div>Loading</div> }>
        { async () => <div/> }
      </AsyncAwait>
    );

    expect(wrapper.equals(<div>Loading</div>)).to.equal(true);
  });
});
