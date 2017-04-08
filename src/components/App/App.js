// @flow
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, history, location } from 'react-router-dom';

import Title from '../Title';
import SlideManager from '../SlideManager';


const TempPathComponent = ({ location: { pathname } }) => <div>{pathname}</div>;

class App extends Component {
  updateSlide(direction) {
    console.log(history);
    if (direction === 'forward') {
      history.push(history.location.pathname)
    }
  }

  render() {
    return (
      <Router>
        <div>
          <Route path="/1" component={Title} />
          <Route path="/2" component={TempPathComponent} />
          <Route path="/3" component={TempPathComponent} />
          <Route path="/4" component={TempPathComponent} />

          <SlideManager
            goBack={() => this.updateSlide('back')}
            goForward={() => this.updateSlide('forward')}
          />
        </div>
      </Router>
    );
  }
}

export default App;
