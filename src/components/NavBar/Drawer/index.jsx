import React, {
  useContext,
} from 'react';

import {
  NavLink,
} from 'react-router-dom';

import {
  IoMdClose,
} from 'react-icons/io';

import AuthContext from '../../../context/authContext';

import getRoutes from '../../../utils/routes';

import styles from './drawer.module.css';

function Drawer({
  setOpenDrawer = () => {},
}) {
  const {
    data,
  } = useContext(AuthContext);

  return (
    <div className={styles.container}>
      <div className={styles.container__close__drawer}>
        <button
          className={styles.button__close__drawer}
          onClick={() => setOpenDrawer(false)}
        >
          <IoMdClose size={24} color="#353535" />
        </button>
      </div>
      <div className={styles.sub__container}>
        <div className={styles.container__link__drawer}>
          {
            (getRoutes(data.userData) || []).map((item) => (
              <NavLink
                to={item.to}
                key={item.id}
                className={({ isActive }) => (isActive ? styles.link__is__active__drawer : styles.link__is__not__active__drawer)}
              >
                <p>
                  {item.label}
                </p>
              </NavLink>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default Drawer;
