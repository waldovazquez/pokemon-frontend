import React from 'react';

import styles from './button.module.css';

function Button({
  type,
  children,
  style,
  onClick = () => { },
}) {
  return (
    <button
      style={style}
      type={type}
      onClick={onClick}
      className={styles.button}
    >
      {children}
    </button>
  );
}

export default Button;
