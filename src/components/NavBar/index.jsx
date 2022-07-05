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
import Pokeball from '../../assets/pokeball_icon.png';

import './styles.css';

function NavBar({
  routes = [],
}) {
  const {
    logout,
  } = useContext(AuthContext);

  return (
    <div style={{
      height: '60px',
      backgroundColor: '#F02D3A',
      position: 'absolute',
      top: 0,
      width: '100%',
    }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0px 10px',
        height: '60px',
      }}
      >
        <Link
          to="/home?page=1"
          style={{
            height: '46px',
          }}
        >
          <img src={Pokeball} alt="pokeball" height={48} width={48} className="pokeball" />
        </Link>
        {
        routes && routes.map((item) => (
          <Link
            to={item.to}
            key={item.id}
            style={{
              textDecoration: 'none',
              color: '#EFF6EE',
            }}
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
                color: '#EFF6EE',
              }}
            />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
}

export default NavBar;
