import React from 'react';

import NavBar from '../NavBar';
import Footer from '../Footer';

import Routes from './routes';

function Screen({
  children,
}) {
  return (
    <div style={{
      backgroundColor: '#273043',
    }}
    >
      <NavBar routes={Routes} />
      <div style={{
        margin: '60px auto',
        maxWidth: '1200px',
      }}
      >
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default Screen;
