/* eslint-disable no-console, no-use-before-define */
const path = require('path');
const fs = require('fs');
const changeCase = require('change-case');


function run(ComponentName) {
  if (!ComponentName) {
    throw new Error(`
      Please supply a component name!
      'npm run add-component -- YourComponentName'
    `);
  } else if (!changeCase.isUpperCase(ComponentName[0])) {
    throw new Error(`
      Custom React components need to be in PascalCase.
      You provided ${ComponentName}.

      Please capitalize the first letter:
      "${changeCase.upperCaseFirst(ComponentName)}"
    `);
  }

  const componentDirectory = path.join(
    __dirname,
    '../../presentation/components',
    ComponentName
  );
  createDirectory(componentDirectory);

  const className = changeCase.camelCase(ComponentName);

  // Create our index file, which points to our JS file
  const indexPath = path.join(componentDirectory, 'index.js');
  const indexTemplate = buildIndexFile(ComponentName);
  fs.writeFileSync(indexPath, indexTemplate);

  // Create and write JS to file
  const componentPath = path.join(componentDirectory, `${ComponentName}.js`);
  const componentTemplate = buildJSTemplate(ComponentName, className);
  fs.writeFileSync(componentPath, componentTemplate);

  // Create and write inline styles to file
  const stylesPath = path.join(componentDirectory, `${ComponentName}.styles.js`);
  const stylesTemplate = buildStylesTemplate(ComponentName, className);
  fs.writeFileSync(stylesPath, stylesTemplate);

  console.info(`Component ${ComponentName} successfully created!`);
  return true;
}


// Helper Methods
function createDirectory(componentDirectory) {
  try {
    fs.mkdirSync(componentDirectory);
  } catch (err) {
    console.error(err);
    throw new Error(`Error creating directory for ${ComponentName}.`);
  }

  return componentDirectory;
}

function buildIndexFile(ComponentName) {
  return `export { default } from './${ComponentName}';\n`
}

function buildJSTemplate(ComponentName, className) {
  // Not digging the break in indentation here,
  // but it's needed for the file to render correctly :(
  return `\
// @flow
// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import { css } from 'aphrodite';

import styles from './${ComponentName}.styles';


const ${ComponentName} = () => {
  return (
    <div className={css(styles.${className})}>
      Your Component Here :)
    </div>
  );
};

${ComponentName}.defaultProps = {

};

export default ${ComponentName};\n`;
}

function buildStylesTemplate(ComponentName, className) {
  return `\
import { StyleSheet } from 'aphrodite';

export default StyleSheet.create({
  ${className}: {

  },
});\n`;
}

const ComponentName = process.argv[2];
run(ComponentName);
