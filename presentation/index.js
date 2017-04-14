// Import React
import React from "react";

// Import Spectacle Core tags
import {
  BlockQuote,
  Cite,
  Deck,
  Fill,
  Heading,
  ListItem,
  List,
  Quote,
  Slide,
  Text,
} from "spectacle";

// Import image preloader util
import preloader from "spectacle/lib/utils/preloader";

// Import theme
import createTheme from "spectacle/lib/themes/default";

// Require CSS
require("normalize.css");
require("spectacle/lib/themes/default/index.css");


const images = {
  reactRally: require("../assets/react-rally-ryan.jpg"),
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
        transition={["slide"]}
        transitionDuration={300}
        theme={theme}
        progress="bar"
      >
        <Slide bgColor="tertiary">
          <Fill>
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

            <Text style={{ position: "fixed", bottom: 0 }} textColor="primary" size={5}>
              By Joshua Comeau
            </Text>
          </Fill>
        </Slide>
        <Slide bgImage={images.reactRally} />

        <Slide bgColor="tertiary">
          <Heading size={6} textColor="primary" caps>Typography</Heading>
          <Heading size={1} textColor="secondary">Heading 1</Heading>
          <Heading size={2} textColor="secondary">Heading 2</Heading>
          <Heading size={3} textColor="secondary">Heading 3</Heading>
          <Heading size={4} textColor="secondary">Heading 4</Heading>
          <Heading size={5} textColor="secondary">Heading 5</Heading>
          <Text size={6} textColor="secondary">Standard text</Text>
        </Slide>
        <Slide bgColor="primary" textColor="tertiary">
          <Heading size={6} textColor="secondary" caps>Standard List</Heading>
          <List>
            <ListItem>Item 1</ListItem>
            <ListItem>Item 2</ListItem>
            <ListItem>Item 3</ListItem>
            <ListItem>Item 4</ListItem>
          </List>
        </Slide>
        <Slide bgColor="secondary" textColor="primary">
          <BlockQuote>
            <Quote>Example Quote</Quote>
            <Cite>Author</Cite>
          </BlockQuote>
        </Slide>
      </Deck>
    );
  }
}
