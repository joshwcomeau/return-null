// @flow
import React, { Component } from 'react';
import debounce from 'lodash/debounce';
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

  constructor() {
    super();

    this.updateMessage = debounce(this.updateMessage, 500);
  }

  updateMessage = (ev: SyntheticInputEvent) => {
    this.setState({ message: ev.target.value });
  }

  handleTextareaChange = (ev: SyntheticInputEvent) => {
    ev.persist();

    this.updateMessage(ev);
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
          onChange={this.handleTextareaChange}
          defaultValue={message}
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
