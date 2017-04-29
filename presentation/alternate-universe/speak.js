// I wanted to see what a non-component implementation would look like, of the
// same functionality. This method covers roughly the same ground as
// components/Speak.
//
// Note that you get more "for free" with the component version:
//  - You don't need to decide when to call this method, it just calls itself
//    when changes happen
//  - There's no automatic stopping on component dismount

const speak = ({ language, message }) => {
  // Cancel any queued utterances
  window.speechSynthesis.cancel();

  const voices = window.speechSynthesis.getVoices();

  // If it's not yet ready, register a callback to re-invoke this method
  // when it is.
  if (voices.length === 0) {
    window.speechSynthesis.onvoiceschanged = () => {
      if (window.speechSynthesis.getVoices().length > 0) {
        speak({ language, message })
      }
    };

    return;
  }

  const utterance = new window.SpeechSynthesisUtterance();

  utterance.voice = voices.find(voice => (
    voice.lang.startsWith(language)
  ));

  utterance.lang = language;
  utterance.text = message;

  window.speechSynthesis.speak(utterance);
};

export default speak;
