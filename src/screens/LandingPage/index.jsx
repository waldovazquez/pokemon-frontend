import React, {
  useContext,
} from 'react';

import {
  useNavigate,
} from 'react-router-dom';

import AuthContext from '../../context/authContext';

import Screen from '../../components/Screen';
import Button from '../../components/Button';

import CharizardLanding from '../../assets/charizardLanding.png';

import styles from './landingpage.module.css';

function LandingPage() {
  const {
    data,
  } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <Screen safe>
      <div className={styles.container}>
        <div className={styles.container__information}>
          <div className={styles.container__title}>
            <p className={styles.title}>Discover And Collect Your Pokémon</p>
          </div>
          {!data.userData && (
          <div className={styles.container__buttons}>
            <Button
              className={styles.component__left__button}
              onClick={() => navigate('/sign-in')}
            >
              Sign In
            </Button>
            <Button
              className={styles.component__right__button}
              onClick={() => navigate('/sign-up')}
            >
              Sign Up
            </Button>
          </div>
          )}
        </div>
        <div className={styles.container__image}>
          <img
            src={CharizardLanding}
            alt="charizard"
            className={styles.image}
          />
        </div>
      </div>
    </Screen>
  );
}

export default LandingPage;
