// @flow
// eslint-disable-next-line no-unused-vars
import React, { Component, PropTypes } from 'react';
import { css } from 'aphrodite';

import styles from './SlideManager.styles';


type Props = {
  goBack: () => void,
  goForward: () => void,
};

class SlideManager extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
  }

  handleKeydown = (ev: MouseEvent) => {
    console.log(this);
    switch (ev.code) {
      case 'ArrowLeft': return this.props.goBack();
      case 'ArrowRight': return this.props.goForward();
    }
  }

  render() {
    return null;
  }
}

export default SlideManager;
