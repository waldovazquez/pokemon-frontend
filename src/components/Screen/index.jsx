import React from 'react';

import NavBar from '../NavBar';
import Footer from '../Footer';

function Screen({
  children,
}) {
  return (
    <div style={{
      backgroundColor: '#8D99AE',
    }}
    >
      <NavBar />
      <div style={{
        margin: '60px auto',
        maxWidth: '1280px',
      }}
      >
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default Screen;
