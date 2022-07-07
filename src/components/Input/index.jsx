import React from 'react';

import styles from './input.module.css';

function Input({
  value,
  onChange,
  type,
  placeholder,
  id,
  icon,
  activeIcon,
  alt,
  className,
}) {
  return (
    <div style={{
      position: activeIcon && 'relative',
    }}
    >
      {icon && (
        <img
          src={icon}
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
          textIndent: activeIcon ? '40px' : '10px',
        }}
      />
    </div>
  );
}

export default Input;
