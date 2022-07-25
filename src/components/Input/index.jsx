import React from 'react';

import styles from './input.module.css';

function Input({
  value,
  type,
  required,
  placeholder,
  label = '',
  labelColor = '#2B2D42',
  labelRow = false,
  onChange = () => { },
  register = () => { },
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
          required,
          ...registerProps,
        })}
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
