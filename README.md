# react-async-await

React Component to render asynchronously.

### Usage

```jsx
import React, { PropTypes } from 'react';
import AsyncAwait from 'react-async-await';

const Example = ({ title }) => <div>{ title }</div>;

Example.propTypes = {
  title: PropTypes.string
};

const myAsyncFunc = () => new Promise(resolve => {
  setTimeout(() => resolve('Hello world'), 3000);
});

const Demo = () => (
  <AsyncAwait>
    { async () => <Example title={ await myAsyncFunc() }/> }
  </AsyncAwait>
);
```

### Examples

#### Destructuring

```jsx
<AsyncAwait>
  { async () => <Example { ...(await getProps()) }/> }
</AsyncAwait>
```

#### Try / catch

```jsx
<AsyncAwait>
  { async () => {
    let view;

    try {
      view = <Example title={ await myAsyncFunc() }/>;
    }
    catch (error) {
      view = <div>{ error.message }</div>;
    }

    return view;
  } }
</AsyncAwait>
```

#### Without async/await syntax, using a Promise

```jsx
<AsyncAwait>
  { () => new Promise(resolve => setTimeout(() => {
    resolve(<Example title='Hello world !'/>);
  }, 2000)) }
</AsyncAwait>
```

#### React Router v4 async route with transition

Here we return an `<AsyncAwait/>` component in a React Router `<Match/>` children prop. When the route is matched, it will wait for the `db.find()` async function and then render the result. If the route changes, it will wait again, and rerender again. This will make the transition trigger only after the async function is complete.

```jsx
const MyAsyncView = ({ components }) => (
  <Match
    pattern='/some/:id'
    children={ ({ matched, params: { id } = {} }) => (
      <AsyncAwait>
        { async () => (
          <ReactCSSTransitionGroup
            transitionName='some-transition'
            transitionEnterTimeout={ 300 }
            transitionLeaveTimeout={ 300 }
          >
            { matched ? (
              <div key={ id }>
                <SomeComponent { ...(await db.find(id)) }/>
              </div>
            ) : null }
          </ReactCSSTransitionGroup>
        ) }
      </AsyncAwait>
    ) }
  />
);
```

<!-- react-components-docs -->
[index.js](src/index.js)
### 

#### Props

##### children

- **required:** true
- **type:** func 

An async function that returns a React element.

##### default

- **required:** false
- **type:** node 

A React element to render until the async function has not been resolved.
<!-- react-components-docs:end -->
