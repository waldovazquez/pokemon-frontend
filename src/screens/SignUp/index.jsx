import React, {
  useState,
  useEffect,
} from 'react';

import {
  useNavigate,
  Link,
} from 'react-router-dom';

import Slider from 'react-slick';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Toast from '../../components/Toast';
import Screen from '../../components/Screen';

import PokemonSignUp from '../../assets/pokemonSignUp.png';

import {
  AVATARS,
  LOGO_URL,
} from '../../utils/constants';

import {
  register,
} from '../../libs/user';

import styles from './signup.module.css';

function SignUp() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [avatar, setAvatar] = useState(AVATARS[0]);
  const [alert, setAlert] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [seconds, setSeconds] = useState(null);

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

      setLoading(true);

      const response = await register(dataToSignUp);
      if (response && response.ok) {
        setAlert({
          severity: 'success',
          message: 'User Successfully Created',
        });
        setRedirect(true);
        setSeconds(3);
      }
    } catch (e) {
      console.info('Error', e);
      setAlert({
        severity: 'error',
        message: 'Something is wrong',
      });
    } finally {
      setLoading(false);
    }
    return null;
  }

  useEffect(() => {
    const myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds((oldSecond) => oldSecond - 1);
      }
    }, 1000);

    if (seconds === 0) {
      navigate('/sign-in');
    }

    return () => {
      clearInterval(myInterval);
    };
  }, [
    seconds,
  ]);

  return (
    <Screen safe>
      {!redirect && (
        <form onSubmit={(e) => e.preventDefault()}>
          <div className={styles.container}>
            <div className={styles.sub__container}>
              <div className={styles.content}>
                <img
                  src={PokemonSignUp}
                  alt="pokemonSignUp"
                  className={styles.image}
                />
                <div className={styles.container__content__right}>
                  <div className={styles.title}>
                    <p>
                      Sign Up
                    </p>
                  </div>
                  <div className={styles.container__input}>
                    <Input
                      type="text"
                      label="Firstname"
                      placeholder="Firstname *"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className={styles.component__input}
                    />
                    <Input
                      type="text"
                      label="Lastname"
                      placeholder="Lastname *"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className={styles.component__input}
                    />
                    <Input
                      type="email"
                      label="Email"
                      placeholder="Email *"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={styles.component__input}
                    />
                    <Input
                      type="password"
                      label="Password"
                      placeholder="Password *"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={styles.component__input}
                    />
                    <Input
                      type="password"
                      label="Confirm Password"
                      placeholder="Confirm Password *"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={styles.component__input}
                    />
                  </div>
                  <div className={styles.container__avatars}>
                    <p>
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
                  <div className={styles.button__sign__in}>
                    <Button
                      type="submit"
                      onClick={() => handleSignUp()}
                      className={styles.component__button}
                      disabled={loading}
                    >
                      Sign Up
                    </Button>
                    <Link
                      to="/sign-in"
                      className={styles.component__link}
                    >
                      Already have an account ? Sign In
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
      {redirect && (
        <div className={styles.container__message}>
          <div className={styles.subcontainer__message}>
            <div className={styles.container__message__image}>
              <img
                src={LOGO_URL}
                alt="logoRedirect"
                className={styles.message__image}
              />
            </div>
            <p className={styles.message}>{`You will be redirected to the login screen in ${seconds || ''} seconds`}</p>
          </div>
        </div>
      )}
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
