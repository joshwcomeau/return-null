import { PureComponent } from 'react';
import PropTypes from 'prop-types';

import translate from '../../services/translate';


class Translate extends PureComponent {
  static propTypes = {
    message: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    target: PropTypes.string.isRequired,
  }

  state = {
    pending: true,
    translatedMessage: null,
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

    // The translation is (obviously) asynchronous, however the props change
    // will trigger a re-render. We don't want to attempt to render with a
    // "stale" message, so let's unset it before we do our work.
    this.setState({ translatedMessage: null });

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

Translate.defaultProps = {

};

export default Translate;
