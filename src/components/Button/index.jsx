import React from 'react';

function Button({
  type,
  style,
  onClick,
  children,
}) {
  return (
    <div style={style}>
      <button
        type={type}
        onClick={onClick}
        style={{
          width: '100%',
          fontSize: '16px',
        }}
      >
        {children}
      </button>
    </div>
  );
}

export default Button;
