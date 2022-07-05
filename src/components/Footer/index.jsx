import React from 'react';

import {
  IconButton,
  Tooltip,
} from '@mui/material';

import {
  LinkedIn,
  GitHub,
  Email,
} from '@mui/icons-material';

function Footer() {
  return (
    <div style={{
      height: '200px',
      display: 'flex',
      backgroundColor: '#F02D3A',
      alignItems: 'center',
      justifyContent: 'space-around',
    }}
    >
      <h1 style={{
        color: '#EFF6EE',
      }}
      >
        Pokemon World
      </h1>
      <div>
        <Tooltip title="LinkedIn">
          <IconButton>
            <a href="https://www.linkedin.com/in/waldo-leonel-vazquez/">
              <LinkedIn sx={{
                color: '#EFF6EE',
              }}
              />
            </a>
          </IconButton>
        </Tooltip>
        <Tooltip title="GitHub">
          <IconButton>
            <a href="https://github.com/waldovazquez">
              <GitHub sx={{
                color: '#EFF6EE',
              }}
              />
            </a>
          </IconButton>
        </Tooltip>
        <Tooltip title="Email">
          <IconButton>
            <a href="mailto:waldovazquezdev@gmail.com">
              <Email sx={{
                color: '#EFF6EE',
              }}
              />
            </a>
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
}

export default Footer;
