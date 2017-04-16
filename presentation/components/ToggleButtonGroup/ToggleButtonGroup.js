import React from 'react';
import { css } from 'aphrodite';

import styles from './ToggleButtonGroup.styles';


const ToggleButtonGroup = ({ buttons, active, onToggle, ...delegated }) => {
  return (
    <div
      {...delegated}
      className={css(styles.toggleButtonGroup, delegated.className)}
    >
      {buttons.map(({ value, label }) => (
        <button
          key={value}
          className={css(
            styles.button,
            value === active && styles.active
          )}
          onClick={() => value !== active && onToggle(value)}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default ToggleButtonGroup;
