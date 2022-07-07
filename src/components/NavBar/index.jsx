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
  Logout,
} from '@mui/icons-material';

import AuthContext from '../../context/authContext';

import styles from './navbar.module.css';

function NavBar({
  routes = [],
}) {
  const {
    logout,
  } = useContext(AuthContext);

  return (
    <div className={styles.container}>
      <div className={styles.subcontainer}>
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
        <Tooltip title="Logout">
          <IconButton aria-label="Logout" onClick={() => logout()}>
            <Logout
              fontSize="large"
              sx={{
                color: '#273043',
              }}
            />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
}

export default NavBar;
