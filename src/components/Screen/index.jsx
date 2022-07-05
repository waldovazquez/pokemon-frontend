import React from 'react';
import NavBar from '../NavBar';
import Footer from '../Footer';

function Screen({ children }) {
  const routes = [{
    id: 1,
    to: '/',
    label: 'Home',
  },
  {
    id: 2,
    to: '/about',
    label: 'About',
  },
  ];
  return (
    <div>
      <NavBar routes={routes} />
      <div style={{
        margin: '40px auto',
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
