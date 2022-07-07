import React, {
  useState,
} from 'react';

import axios from 'axios';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Toast from '../../components/Toast';

import Pikachu from '../../assets/pikachu.png';

import {
  API_URL,
} from '../../utils/constants';

import styles from './register.module.css';

function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alert, setAlert] = useState(null);

  async function handleRegister() {
    try {
      if (password !== confirmPassword) {
        return setAlert({
          severity: 'error',
          message: 'Passwords do not match',
        });
      }

      const dataToRegister = {
        firstName,
        lastName,
        email,
        password,
      };

      const response = await axios.post(`${API_URL}/user/register`, dataToRegister);
      if (response && response.data.ok) {
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
    <>
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
              <Button
                type="submit"
                onClick={() => handleRegister()}
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
    </>
  );
}

export default Register;
