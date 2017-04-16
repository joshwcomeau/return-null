// @flow
import { PureComponent } from 'react';


type Props = {
  language: string,
  message: string,
};

class Speak extends PureComponent {
  props: Props
  utterance: window.SpeechSynthesisUtterance

  static defaultProps = {
    language: 'en',
  }

  constructor(props: Props) {
    super(props);

    this.utterance = new window.SpeechSynthesisUtterance();

    this.updateUtterance(props);

    // The very first time we try to access the voices, none will be found.
    // This is because they're loaded async when requested.
    window.speechSynthesis.onvoiceschanged = () => {
      this.forceUpdate()
    }
  }

  componentWillUpdate(nextProps: Props) {
    window.speechSynthesis.cancel();

    this.updateUtterance(nextProps);
  }

  componentWillUnmount() {
    window.speechSynthesis.cancel();
  }

  updateUtterance(props: Props) {
    this.utterance.voice = window.speechSynthesis.getVoices().find(voice => (
      voice.lang.startsWith(props.language)
    ));

    this.utterance.lang = props.language;
    this.utterance.text = props.message;
  }

  render() {
    window.speechSynthesis.speak(this.utterance);

    return null;
  }
}

export default Speak;
