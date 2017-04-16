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

    console.log('Comparing', source, target)

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

Translate.defaultProps = {

};

export default Translate;
