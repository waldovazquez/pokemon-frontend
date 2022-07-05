import React from 'react';

import {
  IconButton,
  Tooltip,
} from '@mui/material';

import {
  LinkedIn,
  GitHub,
} from '@mui/icons-material';

function Footer() {
  return (
    <div style={{
      height: '200px',
      display: 'flex',
    }}
    >
      <p>Pokemon World</p>
      <Tooltip title="LinkedIn">
        <IconButton>
          <a href="https://www.linkedin.com/in/waldo-leonel-vazquez/">
            <LinkedIn sx={{
              color: 'black',
            }}
            />
          </a>
        </IconButton>
      </Tooltip>
      <Tooltip title="GitHub">
        <IconButton>
          <a href="https://github.com/waldovazquez">
            <GitHub sx={{
              color: 'black',
            }}
            />
          </a>
        </IconButton>
      </Tooltip>
    </div>
  );
}

export default Footer;
