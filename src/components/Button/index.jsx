import React from 'react';

function Button({
  type,
  children,
  style,
  className,
  onClick = () => {},
}) {
  return (
    <button
      style={style}
      type={type}
      onClick={onClick}
      className={className}
    >
      {children}
    </button>
  );
}

export default Button;
