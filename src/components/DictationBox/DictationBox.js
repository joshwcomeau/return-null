// @flow
// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import { css } from 'aphrodite';

import styles from './DictationBox.styles';


class DictationBox extends Component {
  state: {
    message: string,
    dictate: boolean,
  }

  constructor(props) {
    super(props);

    this.state = {
      message: 'Hello World',
      dictate: false,
    };
  }

  updateMessage = (ev: KeyboardEvent) => {
    this.setState({ message: ev.target.value });
  }

  toggleDictation = () => {
    this.setState({ dictate: !this.state.dictate });
  }

  render() {
    const { message, dictate } = this.state;

    return (
      <div className={css(styles.dictationBox)}>
        <textarea onChange={this.updateMessage}>{message}</textarea>
        {dictate && <Speak>{message}</Speak>}
      </div>
    );
  }
};

DictationBox.defaultProps = {

};

export default DictationBox;
