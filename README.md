# `return null;`
##### React Europe 2017 Talk

> Hey folks! 👋
>
> This is the summary of a talk given at React Europe 2017
>
> [Insert link here to video when it becomes available]
>
> This document also covers some stuff I couldn't fit into the talk - enjoy!

--------

### So, components...

React components are typically used to render views.

Because this is how they're most often used, it's natural to think of them as super-powered template renderers. You write some markup, pass it some data via `props`, and in return you get stuff rendered to the screen.

Something I've come to realize, though, is that this "component" pattern is useful for more than just visual UI.

When you use React components, you get a lot of things "for free" - things like lifecycle hooks, internal state, and component composition.

These things wind up being very useful for a bunch of different purposes, completely unrelated to painting elements on a screen.

Let's take a look at some examples of renderless components.



### Simplest Example Possible: Logging

So that we're all on the same page, let's take a look at what I mean by "renderless components":

```jsx
import { PureComponent } from 'react';

// Using a PureComponent so that it only re-renders when its props change.
export default class Log extends PureComponent {
  render() {
    // Our render method logs whatever you pass it as children
    console.info(this.props.children);

    // It returns `null`, so that nothing is rendered to the DOM.
    return null;
  }
}
```

You'd use it like this:

```jsx
const UserProfile = ({ currentUser }) => (
  <div>
    <h1>{currentUser.name}</h1>

    <Log>{currentUser}</Log>
  </div>
);
```

This is, of course, a contrived example. Even as such, though, it occurs to me that with a little extra effort, this could be genuinely useful:

```jsx
import { PureComponent } from 'react';

// Using a PureComponent so that it only re-renders when its props change.
export default class Log extends PureComponent {
  log() {
    // Calculate the owner component, so that we can find its callsite
    // (this depends on react internals and may change at any point, but this
    // has been a stable way to find parents for several years now).
    const parent = this._reactInternalInstance
      ._currentElement
      ._owner
      ._instance;

    console.group();
    console.info('data:', this.props.children);
    console.info('caller:', parent);
    console.groupEnd();
  }

  render() {
    // Only log in development environment
    if (process.env.NODE_ENV === 'development') {
      this.log();
    }

    return null;
  }
}
```

### A more interesting example

The web continues to advance and bring with it more native APIs that do awesome things. One such example is the Web Speech API.

The traditional way of using an API like this with React would be to call the API methods (or some lightweight wrapper over them) from your components.

It turns out that by making _the component_ the abstraction, you get a bunch of neat properties for free. Let's take a look at a <Speech /> component:

```jsx
class Speak extends PureComponent {
  static propTypes = {
    language: PropTypes.string,
    children: PropTypes.string.isRequired,
  }

  static defaultProps = {
    language: 'en',
  }

  // The SpeechSynthesis API is invoked with an 'utterance', an object that
  // holds all necessary information about the voice, language, and message.
  utterance = new window.SpeechSynthesisUtterance()

  componentDidMount() {
    // This is a quirk of the SpeechSynthesis API.
    // In order to speak, you need voices, and sometimes those voices aren't
    // ready when the component mounts.
    // By forcing an update when the voices load, we ensure any on-mount
    // message is spoken.
    window.speechSynthesis.onvoiceschanged = () => {
      this.forceUpdate()
    };
  }

  componentWillUnmount() {
    // Stop any currently-playing or queued speech from continuing
    // after this component is unmounted.
    window.speechSynthesis.cancel();
  }

  speak() {
    // This method handles the actual 'speaking', using the SpeechSynthesis
    // API. For simplicity, we grab the first voice that supports the language
    // specified in the props.
    const { language, message } = this.props;

    window.speechSynthesis.cancel();

    this.utterance.voice = window.speechSynthesis
      .getVoices()
      .find(voice => voice.lang.startsWith(language));

    this.utterance.lang = language;
    this.utterance.text = message;

    window.speechSynthesis.speak(this.utterance);
  }

  render() {
    return null;
  }
}
```

This component can be used like so:

```jsx
class DictationBox extends Component {
  state = { message: '' }

  render() {
    return (
      <div>
        <textarea
          placeholder="Add some text here..."
          onChange={ev => (
            this.setState({ message: ev.target.value })
          )}
        />

        <Speak message={this.state.message} />
      </div>
    )
  }
}
```

### What do we gain from this?

On first glance, you might think that this is overengineered, or an unnecessary layer of abstraction.

The thing is, most APIs have quirks, and those quirks can only be abstracted so much.

For fun, I created an ["alternate universe" version of this code](https://github.com/joshwcomeau/return-null/blob/master/presentation/alternate-universe/speak.js). It exposes a `speak` method and encapsulates the `onvoicesloaded` quirk, as well as handling interrupts.

When you want to use this method, though, you have to do a lot more work than just adding `<Speak message={message} />`:

```js
class DictationBox extends Component {
  state = { message: '' }

  componentWillUnmount() {
    // We need to do unmount cleanup! This doesn't happen automatically anymore
    window.speechSynthesis.cancel();
  }

  componentDidMount() {
    // If we wanted it to speak on-mount, we'd have to add this here.
    speak(this.state.message);
  }

  componentDidUpdate(prevProps, prevState) {
    // We also need to decide when to invoke the speech method. This was
    // hooked into our component lifecycle automatically, but no longer is.
    if (prevState.message !== this.state.message) {
      speak(this.state.message);
    }
  }

  render() {
    return (
      <div>
        <textarea
          placeholder="Add some text here..."
          onChange={ev => (
            this.setState({ message: ev.target.value })
          )}
        />

        <Speak message={this.state.message} />
      </div>
    )
  }
}
```

Even though we've abstracted our `speak` method, there's still a fair bit of plumbing to connect it to our `DictationBox` component!

We need to repeat this plumbing every time we want to use the SpeechSynthesis API. It becomes a lot of duplicated boilerplate that can be removed by encapsulating with a component instead of a function.



### Will It Compose?

As I was preparing this talk, I realized that I'd be delivering this talk in Paris. Our humble Speak component is cool, but it's not bilingual!

I started to think: what if I added the ability to translate the given message into another language? So that you can enter `Hello, Paris`, and have it output `Bonjour, Paris`.

It felt like a distinct, separate concern from Speaking, though; this new concern deals with the Google Translate API, not the Web Speech API. And here is where the component-as-encapsulation pattern really shines: composition.

I started by sketching out my ideal API. I wanted a `<Translate>` component that would take a `message` as input (along with `source` and `target` languages), and pass a `translatedMessage` down, as output, to a child element.

There are a few ways to do this, but the most explicit is the [`function-as-children` pattern](https://medium.com/merrickchristensen/function-as-child-components-5f3920a9ace9).

Here's how that looks:

```jsx
<Translate
  source="en"
  target={target}
  message={message}
>
  {translatedMessage => (
    <Speak
      language={target}
      message={translatedMessage}
    />
  )}
</Translate>
```


Our `<Speak>` component hasn't changed, it's just getting its data from a new source.

Here's what that `<Translate>` component looks like:

```jsx
// a lightweight wrapper over Google Translate API
import translate from '../../services/translate';

const LANGUAGES = ['en', 'fr', ...];


class Translate extends Component {
  static propTypes = {
    message: PropTypes.string.isRequired,
    source: PropTypes.oneOf(LANGUAGES).isRequired,
    target: PropTypes.oneOf(LANGUAGES).isRequired,
    children: PropTypes.function.isRequired,
  }

  state = {
    translatedMessage: null,
  }

  shouldComponentUpdate(nextProps, nextState) {
    // We only want to re-render when the "output", our translatedMessage,
    // has changed. This prevents unnecessary re-rendering of children.
    return (
      this.state.translatedMessage !== nextState.translatedMessage
    );
  }

  componentWillReceiveProps({ source, target, message }) {
    // NOTE: snipped some validation business, for brevity.

    translate({ source, target, message })
      .then(translatedMessage => {
        this.setState({ translatedMessage });
      });
  }

  render() {
    const { translatedMessage } = this.state;

    // So, this component doesn't `return null;`, so this is sorta cheating.
    // But, it's used to augment a component that does, and untimately no DOM
    // is touched by the rendering of this component.
    return this.props.children(translatedMessage);
  }
};
```

Here, we're making great use of React state and lifecycle methods to ensure that the children get rendered with the right stuff at the right time. These are tools you don't have when working with traditional functions.


### But wait, there's more!

This is just the tip of the iceberg of what's possible with this pattern. Some other usecases:

- Event Handlers
- Non-DOM UI (eg. Canvas)
- Network requests
- Head stuff (eg. React Helmet)
- Anything that changes over time
- ✨ Anything you can imagine ✨

Obviously this is not the right solution for all problems, but interesting things happen when you think of components as super-powered functions.


### Prior Art

You can learn much more about the ideas in this document from these two BAMFs:

• Ryan Florence (specifically his [2016 React Rally talk](https://www.youtube.com/watch?v=kp-NOggyz54)).

• Ken Wheeler (pretty much everything he does)


# Thanks 👋

Still curious? Poke around with the [components used in the presentation](https://github.com/joshwcomeau/return-null/tree/master/presentation/components), or the [alternate-universe snippets](https://github.com/joshwcomeau/return-null/tree/master/presentation/alternate-universe).



