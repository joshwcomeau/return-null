// @flow
import React, { Component } from 'react';
import debounce from 'lodash/debounce';
import { css } from 'aphrodite';

import Speak from '../Speak';
import ToggleButtonGroup from '../ToggleButtonGroup';
import Translate from '../Translate';
import styles from './DictationBoxWithTranslate.styles';


class DictationBoxWithTranslate extends Component {
  state: {
    message: string,
    target: 'en' | 'fr',
  }

  state = {
    message: '',
    target: 'en',
  };

  constructor() {
    super();

    this.updateMessage = debounce(this.updateMessage, 500);
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

        <Translate source="en" target={target} message={message}>
          {translatedMessage => (
            <div>
              {console.log('Rendering dict with', translatedMessage)}
              <Speak language={target} message={translatedMessage} />
            </div>
          )}
        </Translate>
      </div>
    );
  }
};

export default DictationBoxWithTranslate;
