// @flow
import React from 'react';
import { css } from 'aphrodite';

import styles from './ComponentName.styles';


type Props = {
  children: string,
};

const ComponentName = ({ children }: Props) => (
  <span className={css(styles.componentName)}>
    &lt;{children}&gt;
  </span>
)

export default ComponentName;
