// @flow
import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';


const TempPathComponent = ({ location: { pathname } }) => <div>{pathname}</div>;

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
