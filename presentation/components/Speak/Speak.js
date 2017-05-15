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

  utterance = new window.SpeechSynthesisUtterance()

  componentDidMount() {
    // The very first time we try to access the voices, none will be found.
    // This is because they're loaded async when requested.
    window.speechSynthesis.onvoiceschanged = () => {
      this.forceUpdate()
    }
  }

  componentWillUnmount() {
    window.speechSynthesis.cancel();
  }

  speak() {
    const { language, message } = this.props;

    window.speechSynthesis.cancel();

    this.utterance.voice = window.speechSynthesis.getVoices().find(voice => (
      voice.lang.startsWith(language)
    ));

    this.utterance.lang = language;
    this.utterance.text = message;

    window.speechSynthesis.speak(this.utterance);
  }

  render() {
    this.speak();

    return null;
  }
}

export default Speak;
