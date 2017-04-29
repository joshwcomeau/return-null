// @flow
import React, { Component } from 'react';
import debounce from 'lodash/debounce';
import { css } from 'aphrodite';

import Speak from '../Speak';
import styles from './DictationBox.styles';


class DictationBox extends Component {
  state: {
    message: string,
  }

  state = {
    message: '',
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

  render() {
    const { message } = this.state;

    return (
      <div className={css(styles.dictationBox)}>
        <textarea
          placeholder="Add some text here..."
          className={css(styles.textarea)}
          onChange={this.handleTextareaChange}
        />

        <Speak message={message} />
      </div>
    );
  }
};


export default DictationBox;
