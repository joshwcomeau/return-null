// @flow
// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import { css } from 'aphrodite';

import ComponentName from '../../components/ComponentName';
import DictationBox from '../../components/DictationBox';
import Slide from '../../components/Slide';
import styles from './SpeakDemo.styles';


const SpeakDemo = () => {
  return (
    <Slide
      className={styles.speakDemo}
      title={
        <span>
          Demo: <ComponentName>Speak</ComponentName>
        </span>
      }
    >
      <DictationBox />
    </Slide>
  );
};

SpeakDemo.defaultProps = {

};

export default SpeakDemo;
