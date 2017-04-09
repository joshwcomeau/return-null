// @flow
import React from 'react';
import { css } from 'aphrodite';

import styles from './Slide.styles';


type Props = {
  children: any,
  title: any,
};

const Slide = ({ children, title, ...delegated }: Props) => {
  return (
    <div className={css(styles.slide, delegated.className)}>
      {title && <h2 className={css(styles.title)}>{title}</h2>}

      <div className={css(styles.contents)}>
        {children}
      </div>
    </div>
  );
};

export default Slide;
