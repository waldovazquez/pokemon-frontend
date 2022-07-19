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
      <div className={styles.container__image__links}>
        <img
          src={LOGO_URL}
          alt="logoFooter"
          className={styles.logo}
        />
        <div>
          <Tooltip title="LinkedIn">
            <IconButton>
              <a href="https://www.linkedin.com/in/waldo-leonel-vazquez/">
                <BsLinkedin color="#2B2D42" />
              </a>
            </IconButton>
          </Tooltip>
          <Tooltip title="GitHub">
            <IconButton>
              <a href="https://github.com/waldovazquez">
                <BsGithub color="#2B2D42" />
              </a>
            </IconButton>
          </Tooltip>
          <Tooltip title="Email">
            <IconButton>
              <a href="mailto:waldovazquezdev@gmail.com">
                <MdEmail color="#2B2D42" />
              </a>
            </IconButton>
          </Tooltip>
        </div>
      </div>
      <div className={styles.container__author}>
        <p>
          &copy; {`${new Date().getFullYear()} Waldo Vázquez`}
        </p>
      </div>
    </div>
  );
}

export default Footer;
