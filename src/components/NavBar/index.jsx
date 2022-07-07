import React, {
  useContext,
} from 'react';

import {
  Link,
} from 'react-router-dom';

import {
  IconButton,
  Tooltip,
} from '@mui/material';

import {
  MdLogout,
} from 'react-icons/md';

import AuthContext from '../../context/authContext';

import {
  LOGO_URL,
} from '../../utils/constants';

import styles from './navbar.module.css';

function NavBar({
  routes = [],
}) {
  const {
    logout,
    data,
  } = useContext(AuthContext);

  return (
    <div className={styles.container}>
      <div className={styles.subcontainer}>
        <div>
          <img
            src={LOGO_URL}
            alt="logoNavbar"
            height="60px"
            width="160px"
          />
        </div>
        {
        routes && routes.map((item) => (
          <Link
            to={item.to}
            key={item.id}
            className={styles.link}
          >
            {item.label}
          </Link>
        ))
      }
        { data.userData && (
        <Tooltip title="Logout">
          <IconButton aria-label="Logout" onClick={() => logout()}>
            <MdLogout color="#EDF2F4" />
          </IconButton>
        </Tooltip>
        )}
      </div>
    </div>
  );
}

export default NavBar;
