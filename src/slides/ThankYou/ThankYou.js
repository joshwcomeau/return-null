// @flow
// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import { css } from 'aphrodite';

import styles from './ThankYou.styles';


const ThankYou = () => (
  <div className={css(styles.thankYou)}>
    Thanks!

    I'm Joshua Comeau
  </div>
);

ThankYou.defaultProps = {

};

export default ThankYou;
