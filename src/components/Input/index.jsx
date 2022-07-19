import React from 'react';

import styles from './input.module.css';

function Input({
  value,
  onChange = () => { },
  type,
  placeholder,
  label = '',
  labelColor = '#EDF2F4',
  style,
}) {
  return (
    <div className={styles.container}>
      {label && (
        <p
          style={{
            color: labelColor,
          }}
          className={styles.label}
        >
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
