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

function NavBar({
  routes = [],
}) {
  const {
    logout,
  } = useContext(AuthContext);

  return (
    <div style={{
      height: '40px',
      backgroundColor: 'blue',
      position: 'absolute',
      top: 0,
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
    }}
    >
      {
        routes && routes.map((item) => (
          <Link
            to={item.to}
            key={item.id}
            style={{
              textDecoration: 'none',
              color: 'white',
            }}
          >
            {item.label}
          </Link>
        ))
      }
      <Tooltip title="Logout">
        <IconButton aria-label="Logout" onClick={() => logout()}>
          <Logout fontSize="medium" />
        </IconButton>
      </Tooltip>
    </div>
  );
}

export default NavBar;
