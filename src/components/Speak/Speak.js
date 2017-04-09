// @flow
import React, { PureComponent } from 'react';
import { css } from 'aphrodite';

import styles from './Speak.styles';


class Speak extends PureComponent {
  props: {
    language: string,
    children: string,
  }

  state: {
    voicesLoaded: boolean,
  }

  static defaultProps = {
    language: 'en',
  }

  state = {
    voicesLoaded: false,
  }

  constructor(props) {
    super(props);

    this.utterance = new SpeechSynthesisUtterance();



    // The very first time we try to access the voices, none will be found.
    // This is because they're loaded async when requested.
    // Let's force it to update by making a check now, and then updating our
    // utterance once they're ready.
    window.speechSynthesis.onvoiceschanged = () => {
      console.log('Voices ready!');
      this.setState({ voicesLoaded: true });
    }
  }

  componentWillUpdate(nextProps) {
    console.log('Update!', nextProps);
    window.speechSynthesis.cancel();

    this.updateUtterance(nextProps);
  }

  componentWillUnmount() {
    window.speechSynthesis.cancel();
  }

  updateUtterance(props) {
    console.log('Updating!', window.speechSynthesis.getVoices());
    this.utterance.voice = window.speechSynthesis.getVoices().find(voice => (
      console.log('testing', voice.lang , props.language) ||
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
