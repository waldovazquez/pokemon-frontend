import React from 'react';

import {
  IconButton,
  Tooltip,
} from '@mui/material';

import {
  BsLinkedin,
  BsGithub,
} from 'react-icons/bs';

import {
  MdEmail,
} from 'react-icons/md';

function Footer() {
  return (
    <div style={{
      height: '200px',
      display: 'flex',
      backgroundColor: '#9197AE',
      alignItems: 'center',
      justifyContent: 'space-around',
    }}
    >
      <h1 style={{
        color: '#273043',
      }}
      >
        Pokemon World
      </h1>
      <div>
        <Tooltip title="LinkedIn">
          <IconButton>
            <a href="https://www.linkedin.com/in/waldo-leonel-vazquez/">
              <BsLinkedin color="#273043" />
            </a>
          </IconButton>
        </Tooltip>
        <Tooltip title="GitHub">
          <IconButton>
            <a href="https://github.com/waldovazquez">
              <BsGithub color="#273043" />
            </a>
          </IconButton>
        </Tooltip>
        <Tooltip title="Email">
          <IconButton>
            <a href="mailto:waldovazquezdev@gmail.com">
              <MdEmail color="#273043" />
            </a>
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
}

export default Footer;
