import React from 'react';

import styles from './input.module.css';

function Input({
  value,
  onChange = () => { },
  type,
  placeholder,
  label = '',
  labelRow = false,
}) {
  return (
    <div
      style={{
        flexDirection: labelRow && 'row',
      }}
      className={styles.container}
    >
      {label && (
        <p
          style={{
            width: labelRow && '50%',
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
        style={{
          width: labelRow && '50%',
        }}
      />
    </div>
  );
}

export default Input;
