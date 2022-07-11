import React, {
  useState,
  useContext,
} from 'react';

import {
  Link,
  useNavigate,
} from 'react-router-dom';

import axios from 'axios';

import {
  Avatar,
} from '@mui/material';

import AuthContext from '../../context/authContext';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Screen from '../../components/Screen';
import Toast from '../../components/Toast';

import defaultAvatar from '../../assets/defaultAvatar.png';
import User from '../../assets/user.png';
import Key from '../../assets/key.png';

import {
  API_URL,
} from '../../utils/constants';

import {
  setSessionStorage,
} from '../../utils/storage';

import styles from './signin.module.css';

function SignIn() {
  const {
    setData,
  } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState(null);

  async function handleSignIn() {
    try {
      const dataToSignIn = {
        email,
        password,
      };

      const response = await axios.post(`${API_URL}/user/login`, dataToSignIn);
      if (response && response.data.ok) {
        setSessionStorage('x-access-token', response.data.token);
        const responseData = await axios.get(`${API_URL}/user/getbytoken?token=${response.data.token}`);
        if (responseData && responseData.data.ok) {
          setData({
            userData: responseData.data.userData,
            token: response.data.token,
          });
        }
        navigate('/home?page=1');
      }
    } catch (e) {
      console.info('Error', e);
      setAlert({
        severity: 'error',
        message: 'Something is wrong',
      });
    }
  }

  return (
    <Screen>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className={styles.container}>
          <div className={styles.sub__container}>
            <div className={styles.content}>
              <Avatar
                alt="Avatar"
                src={defaultAvatar}
                sx={{
                  height: '128px',
                  width: '128px',
                  marginTop: '16px',
                }}
              />
              <div style={{
                marginTop: '24px',
              }}
              >
                <Input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon={User}
                  activeIcon
                  className={styles.component__input}
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  className={styles.component__input}
                  activeIcon
                  icon={Key}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Link
                to="/sign-up"
                className={styles.component__link}
              >
                Sign Up?
              </Link>
              <Button
                type="submit"
                onClick={() => handleSignIn()}
                className={styles.component__button}
              >
                Sign In
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

export default SignIn;
