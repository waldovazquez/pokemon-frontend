import React from 'react';

import styles from './button.module.css';

function Button({
  type,
  children,
  style,
  disabled = false,
  onClick = () => { },
}) {
  return (
    <button
      style={style}
      type={type}
      onClick={onClick}
      className={styles.button}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
