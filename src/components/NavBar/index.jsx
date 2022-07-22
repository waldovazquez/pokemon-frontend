import React, {
  useState,
  useContext,
} from 'react';

import {
  NavLink,
  useNavigate,
} from 'react-router-dom';

import {
  GiHamburgerMenu,
} from 'react-icons/gi';

import {
  IconButton,
  Avatar,
} from '@mui/material';

import AuthContext from '../../context/authContext';

import Drawer from './Drawer';

import {
  LOGO_URL,
} from '../../utils/constants';

import getRoutes from '../../utils/routes';

import useWindowDimensions from '../../customHooks/useWindowDimensions';

import styles from './navbar.module.css';

function NavBar() {
  const {
    logout,
    data,
  } = useContext(AuthContext);
  const navigate = useNavigate();
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const { width } = useWindowDimensions();

  if (openDrawer === true && width > 1280) {
    setOpenDrawer(false);
  }

  return (
    <div className={styles.container}>
      <div className={styles.subcontainer}>
        <div className={styles.container__left}>
          <NavLink to="/" className={styles.container__logo}>
            <img
              src={LOGO_URL}
              alt="logoNavbar"
              className={styles.logo}
            />
          </NavLink>
          <div className={styles.container__link}>
            {
              (getRoutes(data.userData) || []).map((item) => (
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
          <div className={styles.container__burger}>
            <button
              className={styles.button__burger}
              onClick={() => setOpenDrawer(true)}
            >
              <GiHamburgerMenu size={24} color="#2B2D42" />
            </button>
          </div>
        </div>
        {openDrawer && <Drawer setOpenDrawer={setOpenDrawer} />}
        {data.userData && (
          <div className={styles.menuAvatar}>
            <div className={styles.container__menuAvatar__top}>
              <p>
                {data.userData.firstName} {data.userData.lastName}
              </p>
              <IconButton
                aria-label="Avatar"
                onClick={() => setOpenUserMenu(!openUserMenu)}
              >
                <Avatar
                  src={data.userData.avatar}
                  sx={{
                    width: '48px',
                    height: '48px',
                  }}
                />
              </IconButton>
            </div>
            {openUserMenu && (
              <div className={styles.menu}>
                <div>
                  <Avatar
                    src={data.userData.avatar}
                    sx={{
                      width: '80px',
                      height: '80px',
                    }}
                  />
                </div>
                <div className={styles.container__menu__links}>
                  <button
                    className={styles.profile__button}
                    onClick={() => navigate('/profile')}
                  >
                    <p>
                      Edit Profile
                    </p>
                  </button>
                  <button
                    className={styles.logout__button}
                    onClick={() => logout()}
                  >
                    <p>
                      Log Out
                    </p>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default NavBar;
