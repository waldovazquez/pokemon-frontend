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
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
          context.setUserData(responseData.data.userData);
          context.setToken(response.data.token);
        }
        navigate('/home?page=1');
      }
    } catch (e) {
      console.info('Error', e);
    }
  }

  return (
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
                image={User}
                icon
                className={styles.component__input}
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                className={styles.component__input}
                icon
                onChange={(e) => setPassword(e.target.value)}
                image={Key}
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
  );
}

export default SignIn;
