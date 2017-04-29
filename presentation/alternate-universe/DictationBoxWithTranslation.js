// @flow
import React, { Component } from 'react';
import debounce from 'lodash/debounce';
import { css } from 'aphrodite';

import speak from './speak';
import translate from '../services/translate';

import ToggleButtonGroup from '../components/ToggleButtonGroup';
import styles from './DictationBoxWithTranslate.styles';


class DictationBoxWithTranslate extends Component {
  state: {
    message: string,
    target: 'en' | 'fr',
  }

  state = {
    message: '',
    source: 'en',
    target: 'en',
  };

  constructor() {
    super();

    this.updateMessage = debounce(this.updateMessage, 500);
  }

  componentDidUpdate() {
    const { source, target, message } = this.state;

    if (!message) {
      return;
    }

    if (source === target) {
      speak(message);
      return;
    }

    translate({ source, target, q: message })
      .then(speak);
  }

  updateMessage = (ev: SyntheticInputEvent) => {
    this.setState({ message: ev.target.value });
  }

  changeTarget = (target: string) => {
    this.setState({ target });
  }

  handleTextareaChange = (ev: SyntheticInputEvent) => {
    ev.persist();

    this.updateMessage(ev);
  }

  render() {
    const { message, target } = this.state;

    return (
      <div className={css(styles.dictationBox)}>
        <textarea
          placeholder="Add some text here..."
          className={css(styles.textarea)}
          onChange={this.handleTextareaChange}
          defaultValue={message}
        />

        <ToggleButtonGroup
          className={styles.buttonRow}
          buttons={[
            { label: 'English', value: 'en' },
            { label: 'French', value: 'fr' },
          ]}
          active={target}
          onToggle={this.changeTarget}
        />
      </div>
    );
  }
};

export default DictationBoxWithTranslate;
