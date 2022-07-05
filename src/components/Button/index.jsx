import React from 'react';

function Button({
  type,
  style,
  onClick,
  children,
}) {
  return (
    <div>
      <button
        type={type}
        onClick={onClick}
        style={style}
      >
        {children}
      </button>
    </div>
  );
}

export default Button;
