import React from 'react';

function Button({
  type,
  onClick,
  children,
  style,
  className,
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
