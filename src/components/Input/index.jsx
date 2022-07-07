import React from 'react';

import styles from './input.module.css';

function Input({
  value,
  onChange,
  type,
  placeholder,
  id,
  icon,
  image,
  alt,
  className,
}) {
  return (
    <div style={{
      position: icon && 'relative',
    }}
    >
      {image && (
        <img
          src={image}
          alt={alt}
          height={24}
          width={24}
          className={styles.image}
        />
      )}
      <input
        placeholder={placeholder}
        id={id}
        min={0}
        type={type}
        value={value}
        onChange={onChange}
        className={className}
        style={{
          textIndent: icon ? '40px' : '10px',
        }}
      />
    </div>
  );
}

export default Input;
