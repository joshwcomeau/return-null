// @flow
// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import { css } from 'aphrodite';

import styles from './Translate.styles';


const Translate = () => {
  return (
    <div className={css(styles.translate)}>
      Your Component Here :)
    </div>
  );
};

Translate.defaultProps = {

};

export default Translate;
