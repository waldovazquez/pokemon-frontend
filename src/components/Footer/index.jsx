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

import {
  LOGO_URL,
} from '../../utils/constants';

import styles from './footer.module.css';

function Footer() {
  return (
    <div className={styles.container}>
      <img
        src={LOGO_URL}
        alt="logoFooter"
        width="200px"
        height="80px"
      />
      <div>
        <Tooltip title="LinkedIn">
          <IconButton>
            <a href="https://www.linkedin.com/in/waldo-leonel-vazquez/">
              <BsLinkedin color="#EDF2F4" />
            </a>
          </IconButton>
        </Tooltip>
        <Tooltip title="GitHub">
          <IconButton>
            <a href="https://github.com/waldovazquez">
              <BsGithub color="#EDF2F4" />
            </a>
          </IconButton>
        </Tooltip>
        <Tooltip title="Email">
          <IconButton>
            <a href="mailto:waldovazquezdev@gmail.com">
              <MdEmail color="#EDF2F4" />
            </a>
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
}

export default Footer;
