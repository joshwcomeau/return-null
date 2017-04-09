// @flow
// eslint-disable-next-line no-unused-vars
import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router-dom';
import { css } from 'aphrodite';

import styles from './SlideManager.styles';


type Props = {
  goBack: () => void,
  goForward: () => void,
};

export class SlideManager extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
  }

  handleKeydown = (ev: SyntheticKeyboardEvent): void => {
    switch (ev.key) {
      case 'ArrowLeft': return this.updateSlide(-1);
      case 'ArrowRight': return this.updateSlide(1);
    }
  }

  updateSlide(adjustment: -1 | 1): void {
    const { history } = this.props;

    const currentSlide = history.location.pathname.replace(/^\//, '');
    let nextRoute = Number(currentSlide) + adjustment;

    if (nextRoute <= 0) {
        // Slide numbers start at `1`.
        // If the number is 0 or below, just redirect to the homepage.
        nextRoute = '';
    }

    history.push('/'+nextRoute);
  }

  render() {
    return null;
  }
}

export default withRouter(SlideManager);
