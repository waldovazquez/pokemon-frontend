import React, {
  useState,
} from 'react';

import Slider from 'react-slick';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Toast from '../../components/Toast';
import Screen from '../../components/Screen';

import Pikachu from '../../assets/pikachu.png';

import {
  AVATARS,
} from '../../utils/constants';

import styles from './signup.module.css';
import { register } from '../../libs/user';

function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [avatar, setAvatar] = useState(AVATARS[0]);
  const [alert, setAlert] = useState(null);

  async function handleSignUp() {
    try {
      if (password !== confirmPassword) {
        return setAlert({
          severity: 'error',
          message: 'Passwords do not match',
        });
      }

      const dataToSignUp = {
        firstName,
        lastName,
        email,
        password,
        avatar,
      };

      const response = await register(dataToSignUp);
      if (response && response.ok) {
        setAlert({
          severity: 'success',
          message: 'User Successfully Created',
        });
      }
    } catch (e) {
      console.info('Error', e);
      setAlert({
        severity: 'error',
        message: 'Something is wrong',
      });
    }
    return null;
  }

  return (
    <Screen>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className={styles.container}>
          <div className={styles.sub__container}>
            <img
              src={Pikachu}
              alt="pikachu"
              width="300px"
            />
            <div className={styles.container__input}>
              <h1 style={{
                color: '#EFF6EE',
                marginBottom: '12px',
              }}
              >
                Sign Up
              </h1>
              <div>
                <Input
                  type="text"
                  placeholder="Firstname *"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className={styles.component__input}
                />
                <Input
                  type="text"
                  placeholder="Lastname *"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className={styles.component__input}
                />
                <Input
                  type="email"
                  placeholder="Email *"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.component__input}
                />
                <Input
                  type="password"
                  placeholder="Password *"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.component__input}
                />
                <Input
                  type="password"
                  placeholder="Confirm Password *"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={styles.component__input}
                />
              </div>
              <div className={styles.container__avatars}>
                <p style={{
                  color: '#EFF6EE',
                }}
                >
                  Avatar
                </p>
                <div style={{
                  width: '125px',
                }}
                >
                  <Slider
                    dots={false}
                    infinite
                    speed={500}
                    slidesToShow={1}
                    slidesToScroll={1}
                    afterChange={(index) => setAvatar(AVATARS[index])}
                  >
                    {AVATARS.map((av) => (
                      <div key={av}>
                        <img src={av} alt="pokemon" />
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
              <Button
                type="submit"
                onClick={() => handleSignUp()}
                className={styles.component__button}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </form>
      {
        alert && (
        <Toast
          severity={alert.severity}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
        )
    }
    </Screen>
  );
}

export default SignUp;
