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

  handleKeydown = (ev: MouseEvent) => {
    console.log(ev.code, this.props);
    switch (ev.code) {
      case 'ArrowLeft': return this.updateSlide(-1);
      case 'ArrowRight': return this.updateSlide(1);
    }
  }

  updateSlide(adjustment) {
    const { history } = this.props;

    const currentSlide = history.location.pathname.replace(/^\//, '');
    const nextRoute = Number(currentSlide) + adjustment;

    console.log(nextRoute);

    history.push('/'+nextRoute);
  }

  render() {
    return null;
  }
}

export default withRouter(SlideManager);
