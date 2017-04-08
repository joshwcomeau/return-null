// @flow
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, history, location } from 'react-router-dom';

import SlideManager from '../SlideManager';

import Title from '../../slides/Title';


const TempPathComponent = ({ location: { pathname } }) => <div>{pathname}</div>;

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/1" component={Title} />
          <Route path="/2" component={TempPathComponent} />
          <Route path="/3" component={TempPathComponent} />
          <Route path="/4" component={TempPathComponent} />

          <SlideManager />
        </div>
      </Router>
    );
  }
}

export default App;
