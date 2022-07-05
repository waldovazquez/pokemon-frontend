import React from 'react';

function Input({
  value,
  onChange,
  type,
  label,
  placeholder,
  id,
  style,
}) {
  return (
    <div
      style={style}
    >
      <label
        htmlFor={id}
      >
        {label}
      </label>
      <input
        placeholder={placeholder}
        id={id}
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default Input;
