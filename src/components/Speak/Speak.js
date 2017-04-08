// @flow
import React, { PureComponent } from 'react';
import { css } from 'aphrodite';

import styles from './Speak.styles';


class Speak extends PureComponent {
  static defaultProps = {
    voice:
  }

  constructor(props) {
    super(props);

    this.utterance = new SpeechSynthesisUtterance();
  }

  componentWillUpdate(nextProps) {
    speechSynthesisInstance.cancel();

    this.updateUtterance(nextProps);
  }

  componentWillUnmount() {
    speechSynthesisInstance.cancel();
  }

  updateUtterance(props) {
    this.utterance.voice = window.speechSynthesis.getVoices().find(voice => (
        voice.lang === props.language
    ));

    this.utterance.text = props.children;
  }

  render() {
    window.speechSynthesis.speak(this.utterance);

    return null;
  }
}

export default Speak;
