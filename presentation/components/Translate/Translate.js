import { Component } from 'react';
import PropTypes from 'prop-types';

import translate from '../../services/translate';


class Translate extends Component {
  static propTypes = {
    message: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    target: PropTypes.string.isRequired,
  }

  state = {
    translatedMessage: null,
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.translatedMessage !== nextState.translatedMessage;
  }

  componentWillReceiveProps({ source, target, message }) {
    // Ignore updates that don't change the props
    if (
      source === this.props.source &&
      target === this.props.target &&
      message === this.props.message
    ) {
      return;
    }

    // If the source and target languages are the same, no translation
    // is needed. We still want to pass it down though.
    if (source === target) {
      this.setState({ translatedMessage: message });
      return;
    }

    // If no message is provided, treat it as a reset.
    if (!message) {
      this.setState({ translatedMessage: null });
      return;
    }

    translate({ source, target, q: message })
      .then(result => {
        this.setState({ translatedMessage: result });
      });
  }

  render() {
    const { translatedMessage } = this.state;

    if (translatedMessage) {
      return this.props.children(translatedMessage);
    }

    return null;
  }
};

export default Translate;
