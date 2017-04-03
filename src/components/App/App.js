import React, { Component } from 'react';
import './App.styles';

class App extends Component {
  render() {
    const { children } = this.props;

    return (
      <div className="App">
        {children}
      </div>
    );
  }
}

export default App;
