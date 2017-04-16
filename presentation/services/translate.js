// Load the google API library. This exposes `gapi` on the window object.
// Gross, I know.
import '../vendor/google-api';

import { GOOGLE_API_KEY } from '../../secrets';


const config = {
  'apiKey': GOOGLE_API_KEY,
  'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/translate/v2/rest'],
}

let isReady = false;
let initPromise;

// Loads the JavaScript client library and invokes `start` afterwards.
gapi.load('client', () => {
  gapi.client.init(config)
    .then(() => {
      isReady = true;
      console.log('Ready, good to go!')
    })
});

const extractTranslatedText = response => (
  response.result.data.translations[0].translatedText
);

export default function translate({ source, target, q }) {
  const translateOptions = { source, target, q };

  // NOTE: There's a horrible flaw here: If the translation fires before
  // the client has initialized, we do nothing. Because this is a safe bet
  // during the presentation, I'm not worrying about it. Do be aware of
  // this restriction though!
  if (!isReady) {
    return new Promise((resolve, reject) => (
      reject('Sorry, gapi not yet authenticated :(')
    ))
  }

  return gapi.client.language.translations
    .list(translateOptions)
    .then(extractTranslatedText)
}
