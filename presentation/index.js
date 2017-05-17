import React from "react";
import {
  BlockQuote,
  Cite,
  Deck,
  Heading,
  Image,
  ListItem,
  List,
  Quote,
  Slide,
  Text,
} from "spectacle";

import CodeSlide from './components/CodeSlide';
import DictationBox from "./components/DictationBox";
import DictationBoxWithTranslate from "./components/DictationBoxWithTranslate";

// Import image preloader util
import preloader from "spectacle/lib/utils/preloader";

// Import theme
import createTheme from "spectacle/lib/themes/default";

// Require CSS
require("normalize.css");
require("spectacle/lib/themes/default/index.css");


const images = {
  KALogo: require("../assets/ka-logo.png"),
  mario: require("../assets/mario.gif"),
  vInMVC: require("../assets/v-in-mvc.png"),
  kenWheeler: require("../assets/ken-wheeler.jpg"),
  ryanFlorence: require("../assets/ryan-florence.jpg"),
  willItBlend: require("../assets/will-it-blend-smile.jpg"),
  yesItBlends: require("../assets/yes-it-blends.jpg"),
};

preloader(images);

const theme = createTheme({
  primary: "white",
  secondary: "#1F2022",
  tertiary: "#03A9FC",
  quartenary: "#CECECE",
}, {
  primary: "Montserrat",
  secondary: "Helvetica",
  tertiary: "Monaco, monospace",
});

export default class Presentation extends React.Component {
  render() {
    return (
      <Deck
        controls={false}
        transition={[]}
        transitionDuration={0}
        theme={theme}
        progress="bar"
      >
        {/* Title Screen */}
        <Slide
          bgColor="tertiary"
        >
          <Heading
            size={1}
            fit
            lineHeight={1}
            textColor="secondary"
            textFont="tertiary"
            style={{ fontWeight: 100, letterSpacing: -1 }}
          >
            return null;
          </Heading>
          <br />

          <Heading size={3} fit textColor="secondary">
            Experiments with Renderless Components
          </Heading>
        </Slide>

        <Slide notes={`Hello! I'm Josh, a software engineer at Khan Academy.`}>
          <div style={{ fontSize: 124 }}>👋</div>
          <br />
          <Heading size={3}>I'm Josh</Heading>
          <br /><br /><br />
          <Image src={images.KALogo} width={325} />
        </Slide>

        <Slide notes={`
          I apologize in advance; I underestimated how long 5 minutes is.
          As a result I'll be moving pretty fast through stuff. The slides
          and more info will be made available at the end, so if this stuff
          interests you, you can check it out in greater detail.
          `}
        >
          <Image fit src={images.mario} />
        </Slide>

        <Slide
          bgColor="secondary"
          notes={`
            So, today I'd like to talk about components.
            <br /><br />
            React components are typically used to render views.
            <br /><br />
            Because this is how they're most often used, it's natural to think of them as template renderers.
            You write some markup, pass it some data via props, and in return you get stuff rendered to the screen.
            <br /><br />
            Something I've come to realize, though, is that this 'component' pattern is useful for more than just visual UI.
            When you use React components, you get a lot of things "for free", things like lifecycle hooks, internal state...
            <br /><br />
            To illustrate this idea, today I'll be sharing some components that don't render anything to the DOM.
          `}
        >
          <Heading size={3} textColor="primary">So, components...</Heading>
        </Slide>

        {/* Simple example of a renderless component */}
        <CodeSlide
          notes={`
            So, first, what do I mean by a renderless component?
            <br /><br />
            Here's a totally contrived example that can be used for console logging.
            <br /><br />
            (As an aside, this could actually be made into something useful. For example, you could disable logging in prod, use console groups, etc)
          `}
          code={require("raw-loader!./code-samples/BasicExample")}
          ranges={[
            { loc: [0, 9], title: "Basic Example: Logging." },
            { loc: [9, 19] },
          ]}
        />

        <Slide
          bgColor="tertiary"
          notes={`
            Let's look at a slightly more interesting example, using the Web Speech API
            <br /><br />
            [demo of the component]
          `}
        >
          <DictationBox />
        </Slide>

        <CodeSlide
          code={require("raw-loader!./code-samples/Speak-consumption")}
          ranges={[
            { loc: [0, 19], title: "🔎" },
            { loc: [0, 2] },
            { loc: [6, 12] },
            { loc: [13, 14], title: "🤔"}
          ]}
        />

        <CodeSlide
          code={require("raw-loader!./code-samples/Speak")}
          notes={`
            Takes two props: Language, defaults to "english", and children,
            which is the message to speak.
            <br /><br />
            An 'utterance' is the thing that gets spoken. You pass it to the
            Web Speech API when it's ready.
            <br /><br />
            The Web Speech API has a few quirks, and one of them is that voices
            are loaded async when you attempt to use them. This means that the
            very first time we try to say something, we won't have any voices.
            'forceUpdate' is a native React method, and it triggers a new update
            cycle, which causes the 'render' method to fire again.
            <br /><br />
            Like any good component, we'll ensure that we don't leave any side
            effects when our component unmounts.
            <br /><br />
            Finally, the "speak" method itself. We begin by interrupting any
          `}
          ranges={[
            { loc: [0, 270], title: "Let's see how it works." },
            { loc: [0, 9] },
            { loc: [10, 11] },
            { loc: [12, 17] },
            { loc: [18, 21] },
            { loc: [22, 36] },
            { loc: [25, 26] },
            { loc: [27, 30] },
            { loc: [31, 33] },
            { loc: [34, 35] },
            { loc: [37, 40] },
          ]}
        />

        <Slide
          notes={`
            So, that's kinda cool, but what have we gained?
            <br /><br />
            The big benefit so far is that DictationBox doesn't have to be
            at all concerned with the Speaking business. We've encapsulated that
            concern.
            <br /><br />
            You might say that we could have encapsulated it just as well using
            helper functions, but that's not entirely true; the Web Speech API,
            like so many other APIs, has some quirks, and so we'd need to add
            several lifecycle methods to DictationBox, deal with the async
            loading of voices, etc. This way, the entirety of the Speak behaviour
            can be encapsulated, and reused anywhere.
            <br /><br />
            While building this, though, I realized that I'd be delivering
            this talk in France, and it really should be bilingual. As with any
            work project, the requirements have changed, and now we get to test
            how adaptable this solution is.
          `}
        >
          <Heading fit>So, that's kinda cool...</Heading>
        </Slide>

        <Slide
          notes={`
            I didn't want to overload the Speak component with translation
            logic, though. So I wondered...
          `}
          bgImage={images.willItBlend}
        />

        <Slide bgImage={images.willItBlend} bgDarken={0.5}>
          <Heading fit textColor="primary">Will It Compose?</Heading>
        </Slide>

        <CodeSlide
          notes={`
            Function-as-children: Not the only way for a component to pass
            data down to its children, but the most explicit. Really elegant
            pattern.
          `}
          code={require("raw-loader!./code-samples/Translate-consumption")}
          ranges={[
            { loc: [0, 42], title: 'New and Improved DictationBox' },
            { loc: [0, 17] },
            { loc: [18, 25] },
            { loc: [26, 38] },
          ]}
        />

        <CodeSlide
          code={require("raw-loader!./code-samples/Translate")}
          ranges={[
            { loc: [0, 39], title: 'Translate Implementation' },
            { loc: [0, 1] },
            { loc: [2, 3] },

            { loc: [5, 16] },
            { loc: [17, 23] },
            { loc: [24, 32] },
            { loc: [33, 38] },
          ]}
          notes={`
            I created a little service to communicate with the Google Translate API
          `}
        />

        <Slide bgColor="tertiary">
          <DictationBoxWithTranslate />
        </Slide>

        <Slide bgImage={images.yesItBlends} />
        <Slide bgImage={images.yesItBlends} bgDarken={0.5}>
          <Heading fit textColor="primary">Yes, it composes!</Heading>
        </Slide>

        <Slide>
          <Heading>Not Just For Web Speech</Heading>
          <List>
            <ListItem>Event Handlers</ListItem>
            <ListItem>Non-DOM UI (eg. Canvas)</ListItem>
            <ListItem>Network Requests</ListItem>
            <ListItem>Anything that changes over time</ListItem>
            <ListItem>✨ Anything you can imagine ✨</ListItem>
          </List>
        </Slide>

        <Slide>
          <Heading textColor="quartenary">Prior Art</Heading>
          <br />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around'
            }}
          >
            <div>
              <Image src={images.kenWheeler} height="35vh" />
              <Heading size={5}>Ken Wheeler</Heading>
              <Text textColor="tertiary">
                @ken_wheeler
              </Text>
            </div>

            <div>
              <Image src={images.ryanFlorence} height="35vh" />
              <Heading size={5}>Ryan Florence</Heading>
              <Text textColor="tertiary">
                @ryanflorence
              </Text>
            </div>
          </div>
        </Slide>



        <Slide>
          <Heading size={2}>Thanks!</Heading>

          <br /><br />
          <Heading fit>
            github.com/joshwcomeau/return-null
          </Heading>

        </Slide>
      </Deck>
    );
  }
}
