import React from 'react';

import styles from './input.module.css';

function Input({
  value,
  type,
  placeholder,
  label = '',
  labelColor,
  labelRow = false,
  onChange = () => { },
  register = () => { },
  onFocus = () => { },
  name,
  registerProps,
}) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: labelRow ? 'row' : 'column',
      alignItems: labelRow ? 'center' : 'flex-start',
    }}
    >
      <p style={{
        color: labelColor,
        width: labelRow && '50%',
      }}
      >
        {label}
      </p>
      <input
        placeholder={placeholder}
        min={0}
        {...register(name, {
          ...registerProps,
        })}
        type={type}
        value={value}
        onChange={onChange}
        className={styles.input}
        style={{
          width: labelRow && '50%',
        }}
        onFocus={onFocus}
      />
    </div>
  );
}

export default Input;
