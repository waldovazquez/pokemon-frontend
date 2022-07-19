import React from 'react';

import NavBar from '../NavBar';
import Footer from '../Footer';

function Screen({
  children,
  safe,
}) {
  return (
    <div style={{
      backgroundColor: '#2B2D42',
    }}
    >
      <NavBar />
      <div style={{
        margin: '60px auto',
        maxWidth: '1280px',
        height: safe && '100vh',
      }}
      >
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default Screen;
