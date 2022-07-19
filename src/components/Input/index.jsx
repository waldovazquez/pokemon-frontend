import React from 'react';

import styles from './input.module.css';

function Input({
  value,
  onChange = () => {},
  type,
  placeholder,
  className,
  label = '',
  labelColor = '#F1FAEE',
}) {
  return (
    <div className={styles.container}>
      { label && (
      <p style={{
        color: labelColor,
      }}
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
        className={className}
      />
    </div>
  );
}

export default Input;
