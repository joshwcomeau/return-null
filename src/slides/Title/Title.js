// @flow
// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import { css } from 'aphrodite';

import styles from './Title.styles';


const Title = () => {
  return (
    <div className={css(styles.title)}>
      <h2 className={css(styles.talkName)}>return null;</h2>
      <h4 className={css(styles.author)}>Joshua Comeau</h4>
    </div>
  );
};

Title.defaultProps = {

};

export default Title;
