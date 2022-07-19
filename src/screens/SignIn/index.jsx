import React, {
  useState,
  useContext,
} from 'react';

import {
  Link,
  useNavigate,
} from 'react-router-dom';

import {
  Avatar,
} from '@mui/material';

import AuthContext from '../../context/authContext';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Screen from '../../components/Screen';
import Toast from '../../components/Toast';

import defaultAvatar from '../../assets/defaultAvatar.png';

import {
  setLocalStorage,
} from '../../utils/storage';

import {
  getByToken,
  login,
} from '../../libs/user';

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
      const response = await login(dataToSignIn);

      if (response && response.ok) {
        setLocalStorage('x-access-token', response.token);
        const userInfo = await getByToken(response.token);

        if (userInfo && userInfo.ok) {
          setData({
            userData: userInfo.userData,
            token: response.token,
          });
          navigate('/home');
        }
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
                }}
              />
              <div className={styles.container__inputs}>
                <Input
                  type="text"
                  label="Email"
                  labelColor="#2B2D42"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  type="password"
                  label="Password"
                  labelColor="#2B2D42"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className={styles.container__link}>
                  <Link
                    to="/sign-up"
                    className={styles.component__link}
                  >
                    Need an account? Sign up
                  </Link>
                </div>
              </div>
              <Button
                type="submit"
                onClick={() => handleSignIn()}
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
