import React from 'react';

import styles from './input.module.css';

function Input({
  value,
  onChange = () => { },
  type,
  placeholder,
  label = '',
  style,
}) {
  return (
    <div className={styles.container}>
      {label && (
        <p className={styles.label}>
          {label}
        </p>
      )}
      <input
        placeholder={placeholder}
        min={0}
        type={type}
        value={value}
        onChange={onChange}
        className={styles.input}
        style={style}
      />
    </div>
  );
}

export default Input;
