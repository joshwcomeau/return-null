// @flow
// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import { css } from 'aphrodite';

import DictationBox from '../../components/DictationBox';
import styles from './SpeakDemo.styles';


const SpeakDemo = () => {
  return (
    <div className={css(styles.speakDemo)}>
      <h3>
        Demo: <span className={css(styles.mono)}>&lt;Speak&gt;</span>
      </h3>

      <DictationBox />
    </div>
  );
};

SpeakDemo.defaultProps = {

};

export default SpeakDemo;
