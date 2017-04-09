// @flow
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import SlideManager from '../SlideManager';

import Title from '../../slides/Title';
import ThankYou from '../../slides/ThankYou';


const TempPathComponent = ({ location: { pathname } }) => <div>{pathname}</div>;

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Title} />
            <Route path="/1" component={TempPathComponent} />
            <Route path="/2" component={TempPathComponent} />
            <Route path="/3" component={TempPathComponent} />
            <Route component={ThankYou} />
          </Switch>
          
          <SlideManager />
        </div>
      </Router>
    );
  }
}

export default App;
