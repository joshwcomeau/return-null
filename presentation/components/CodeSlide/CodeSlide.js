// Super thin wrapper around Spectacle Code Slide

// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import SpectacleCodeSlide from 'spectacle-code-slide';


class CodeSlide extends Component {
  render() {
    return (
      <SpectacleCodeSlide
        maxWidth={1200}
        style={{ fontSize: '0.8em' }}
        lang="jsx"
        {...this.props}
      />
    );
  }
}

export default CodeSlide;
