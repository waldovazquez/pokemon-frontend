import React from 'react';

import Screen from '../../components/Screen';

function About() {
  return (
    <Screen>
      <div style={{
        height: '90vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      >
        <h1>About</h1>
      </div>
    </Screen>
  );
}

export default About;
