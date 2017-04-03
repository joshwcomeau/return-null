import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

import App from './App';


const TempPathComponent = ({ location: { pathname } }) => <div>{pathname}</div>;

ReactDOM.render(
  <Router>
    <App>
      <Route path="/1" component={Title} />
      <Route path="/2" component={TempPathComponent} />
      <Route path="/3" component={TempPathComponent} />
      <Route path="/4" component={TempPathComponent} />
    </App>
  </Router>,
  document.getElementById('root')
);
