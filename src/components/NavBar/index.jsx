import React, {
  useState,
  useContext,
} from 'react';

import {
  Link,
} from 'react-router-dom';

import {
  IconButton,
  Avatar,
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
  const [openUserMenu, setOpenUserMenu] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.subcontainer}>
        <Link to="/">
          <img
            src={LOGO_URL}
            alt="logoNavbar"
            height="60px"
            width="160px"
          />
        </Link>
        <div className={styles.container__right}>
          <div className={styles.container__link}>
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
          </div>
          { data.userData && (
          <div className={styles.menuAvatar}>
            <div className={styles.container__menuAvatar__top}>
              <p>
                {data.userData.firstName}
              </p>
              <IconButton aria-label="Avatar" onClick={() => setOpenUserMenu(!openUserMenu)}>
                <Avatar src={data.userData.avatar} />
              </IconButton>
            </div>
            {openUserMenu && (
            <div className={styles.logout}>
              <p>
                Logout
              </p>
              <IconButton aria-label="Logout" onClick={() => logout()}>
                <MdLogout color="#2B2D42" />
              </IconButton>
            </div>
            )}
          </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
