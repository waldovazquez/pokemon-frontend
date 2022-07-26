import React, {
  useState,
  useContext,
} from 'react';

import {
  Link,
  useNavigate,
} from 'react-router-dom';

import {
  useForm,
} from 'react-hook-form';

import AuthContext from '../../context/authContext';

import Screen from '../../components/Screen';
import Toast from '../../components/Toast';

import ashSignIn from '../../assets/ash.webp';

import {
  setLocalStorage,
} from '../../utils/storage';

import {
  login,
} from '../../libs/user';

import styles from './signin.module.css';

function SignIn() {
  const {
    validateToken,
  } = useContext(AuthContext);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  async function handleSignIn(data) {
    try {
      setLoading(true);
      const response = await login(data);

      if (response && response.ok) {
        setLocalStorage('x-access-token', response.token);
        await validateToken(response.token);
        navigate('/home');
      }
    } catch (e) {
      console.info('Error', e);
      setAlert({
        message: 'Something is wrong',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen safe>
      <div className={styles.container}>
        <div className={styles.sub__container}>
          <div className={styles.content}>
            <img
              src={ashSignIn}
              alt="ash"
              className={styles.image}
            />
            <form
              className={styles.form}
              onSubmit={handleSubmit(handleSignIn)}
            >
              <div className={styles.container__inputs}>
                <div className={styles.container__input}>
                  <p>
                    Email
                  </p>
                  <input
                    placeholder="Email *"
                    type="email"
                    className={styles.input}
                    {...register('email', { required: true })}
                  />
                  {
                    errors.email?.type === 'required'
                    && <p className={styles.error}>Email is required</p>
                  }
                </div>
                <div className={styles.container__input}>
                  <p>
                    Password
                  </p>
                  <input
                    label="Password"
                    placeholder="Password *"
                    type="password"
                    className={styles.input}
                    {...register('password', { required: true })}
                  />
                  {
                    errors.password?.type === 'required'
                    && <p className={styles.error}>Password is required</p>
                  }
                </div>
              </div>
              <input
                type="submit"
                disabled={loading}
                className={styles.input__submit}
                value="Sign In"
              />
            </form>
            <Link
              to="/sign-up"
              className={styles.component__link}
            >
              Need an account? Sign up
            </Link>
          </div>
        </div>
      </div>
      {alert && (
        <Toast
          severity={alert.severity}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
    </Screen>
  );
}

export default SignIn;
