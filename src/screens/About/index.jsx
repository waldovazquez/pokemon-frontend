import React from 'react';

import Screen from '../../components/Screen';

function About() {
  return (
    <Screen
      safe
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
      >
        <h1>About</h1>
      </div>
    </Screen>
  );
}

export default About;
