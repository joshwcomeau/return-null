// @flow
// eslint-disable-next-line no-unused-vars
import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router-dom';


type Props = {
  history: any,
};

export class SlideManager extends Component {
  props: Props

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
  }

  handleKeydown = (ev: SyntheticKeyboardEvent): void => {
    const { type } = ev.target;

    // Ignore keydowns that are targeting an input or textarea.
    if (['input', 'textarea', 'select'].includes(type)) {
      return;
    }

    switch (ev.key) {
      case 'ArrowLeft': return this.updateSlide(-1);
      case 'ArrowRight': return this.updateSlide(1);
      default:
        // Ignore all other key events
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
