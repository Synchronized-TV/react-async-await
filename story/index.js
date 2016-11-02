import React, { PropTypes } from 'react';
import { storiesOf } from '@kadira/storybook';
import AsyncAwait from '../src/index';

const Example = ({ title }) => <div>{ title }</div>;

Example.propTypes = {
  title: PropTypes.string
};

const myAsyncFunc = (value) => new Promise(resolve => {
  setTimeout(() => resolve(value), 2000);
});

const Basic = () => (
  <AsyncAwait>
    { async () => <Example title={ await myAsyncFunc('Hello world !') }/> }
  </AsyncAwait>
);

const loading = <Example title='Loading...'/>;

const DefaultValue = () => (
  <AsyncAwait default={ loading }>
    { async () => <Example title={ await myAsyncFunc('Hello world !') }/> }
  </AsyncAwait>
);

const TryCatch = () => (
  <AsyncAwait>
    { async () => {
      let view;

      try {
        view = <Example title={ await myAsyncFunc('Try') }/>;
        throw new Error('error');
      }
      catch (error) {
        view = <div>{ error.message }</div>;
      }

      return view;
    } }
  </AsyncAwait>
);

storiesOf('react-async-await', module)
  .add('Basic', () => <Basic/>)
  .add('Default value', () => <DefaultValue/>)
  .add('Using try/catch', () => <TryCatch/>);
