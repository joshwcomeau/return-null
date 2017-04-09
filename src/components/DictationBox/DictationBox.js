// @flow
// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import { css } from 'aphrodite';

import Speak from '../Speak';
import styles from './DictationBox.styles';


class DictationBox extends Component {
  state: {
    message: string,
    dictate: boolean,
  }

  state = {
    message: 'Hello World',
    dictate: false,
  };

  updateMessage = (ev: SyntheticInputEvent) => {
    console.log(ev, ev.target)
    this.setState({ message: ev.target.value });
  }

  toggleDictation = () => {
    this.setState({ dictate: !this.state.dictate });
  }

  render() {
    const { message, dictate } = this.state;

    return (
      <div className={css(styles.dictationBox)}>
        <textarea
          className={css(styles.textarea)}
          onChange={this.updateMessage}
          value={message}
        />

        <label className={css(styles.label)}>
          <input
            type="checkbox"
            checked={dictate}
            onChange={this.toggleDictation}
          />
          Enable Dictation
        </label>

        {dictate && <Speak>{message}</Speak>}
      </div>
    );
  }
};


export default DictationBox;
