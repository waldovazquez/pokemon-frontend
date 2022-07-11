import React from 'react';

import {
  useNavigate,
} from 'react-router-dom';

import Screen from '../../components/Screen';
import Button from '../../components/Button';

import PikachuLanding from '../../assets/pikachuLanding.png';

import styles from './landingpage.module.css';

function LandingPage() {
  const navigate = useNavigate();
  return (
    <Screen>
      <div className={styles.container}>
        <div className={styles.container__information}>
          <div className={styles.container__title}>
            <p className={styles.title}>Discover And Collect Your Pokémon</p>
          </div>
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
        </div>
        <img
          src={PikachuLanding}
          alt="pikachu"
        />
      </div>
    </Screen>
  );
}

export default LandingPage;
