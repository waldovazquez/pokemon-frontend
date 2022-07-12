import React, {
  useState,
  useContext,
} from 'react';

import {
  NavLink,
} from 'react-router-dom';

import {
  IconButton,
  Avatar,
} from '@mui/material';

import AuthContext from '../../context/authContext';

import Button from '../Button';

import {
  LOGO_URL,
} from '../../utils/constants';

import getRoutes from '../../utils/routes';

import styles from './navbar.module.css';

function NavBar() {
  const {
    logout,
    data,
  } = useContext(AuthContext);
  const [openUserMenu, setOpenUserMenu] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.subcontainer}>
        <NavLink to="/">
          <img
            src={LOGO_URL}
            alt="logoNavbar"
            height="60px"
            width="160px"
          />
        </NavLink>
        <div className={styles.container__right}>
          <div className={styles.container__link}>
            {
          getRoutes(data.userData).map((item) => (
            <NavLink
              to={item.to}
              key={item.id}
              className={({ isActive }) => (isActive ? styles.link__is__active : styles.link__is__not__active)}
            >
              {item.label}
            </NavLink>
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
              <Button className={styles.logout__button} onClick={() => logout()}>Logout</Button>
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
