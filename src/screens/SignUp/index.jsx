import React, {
  useState,
} from 'react';

import {
  Link,
} from 'react-router-dom';

import {
  useForm,
} from 'react-hook-form';

import Input from '../../components/Input';
import Toast from '../../components/Toast';
import Screen from '../../components/Screen';
import Carousel from '../../components/Carousel';
import Message from './components/Message';

import useWindowDimensions from '../../customHooks/useWindowDimensions';

import {
  AVATARS,
} from '../../utils/constants';

import {
  registerUser,
} from '../../libs/user';

import PokemonSignUp from '../../assets/pokemonSignUp.webp';

import styles from './signup.module.css';

function SignUp() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    clearErrors,
    watch,
  } = useForm();
  const [avatar, setAvatar] = useState(AVATARS[0].image);
  const [currentSlide, setCurrentSlide] = useState(0);
  const {
    width,
  } = useWindowDimensions();
  const [redirect, setRedirect] = useState(false);
  const [alert, setAlert] = useState(null);

  async function handleSignUp(data) {
    try {
      const response = await registerUser({
        ...data,
        avatar,
      });

      if (response && !response.ok) {
        return setAlert({
          message: 'There is already a user with that email',
        });
      }

      if (response && response.ok) {
        setAlert({
          severity: 'success',
          message: 'User Successfully Created',
        });
        setRedirect(true);
      }
    } catch (e) {
      console.info('Error', e);
      setAlert({
        message: 'Something is wrong',
      });
    }
    return null;
  }

  return (
    <Screen>
      {!redirect && (
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.container__image}>
              <img
                src={PokemonSignUp}
                alt="pokemonSignUp"
                className={styles.image}
              />
            </div>
            <div className={styles.container__content__right}>
              <div className={styles.title}>
                <p>
                  Sign Up
                </p>
              </div>
              <form onSubmit={handleSubmit(handleSignUp)}>
                <div className={styles.container__inputs}>
                  <div className={styles.container__input}>
                    <Input
                      type="text"
                      name="firstName"
                      label="First Name"
                      placeholder="First Name *"
                      register={register}
                      registerProps={{
                        required: true,
                      }}
                      onFocus={() => clearErrors('firstName')}
                    />
                    {
                      errors.firstName?.type === 'required'
                      && <p className={styles.error}>First Name is required</p>
                    }
                  </div>
                  <div className={styles.container__input}>
                    <Input
                      type="text"
                      name="lastName"
                      label="Last Name"
                      placeholder="Last Name *"
                      register={register}
                      registerProps={{
                        required: true,
                      }}
                      onFocus={() => clearErrors('lastName')}
                    />
                    {
                      errors.lastName?.type === 'required'
                      && <p className={styles.error}>Last Name is required</p>
                    }
                  </div>
                  <div className={styles.container__input}>
                    <Input
                      type="email"
                      name="email"
                      label="Email Address"
                      placeholder="Email Address *"
                      register={register}
                      registerProps={{
                        required: true,
                      }}
                      onFocus={() => clearErrors('email')}
                    />
                    {
                      errors.email?.type === 'required'
                      && <p className={styles.error}>Email Address is required</p>
                    }
                  </div>
                  <div className={styles.container__input}>
                    <Input
                      type="password"
                      name="password"
                      label="Password"
                      placeholder="Password *"
                      register={register}
                      registerProps={{
                        minLength: 6,
                        required: true,
                      }}
                      onFocus={() => clearErrors('password')}
                    />
                    {
                      errors.password?.type === 'required'
                        ? <p className={styles.error}>Password is required</p>
                        : errors.password?.type === 'minLength'
                        && <p className={styles.error}>You need a password greater than or equal to 6 letters</p>
                    }
                  </div>
                  <div className={styles.container__input}>
                    <Input
                      type="password"
                      name="confirmPassword"
                      label="Confirm Password"
                      placeholder="Confirm Password *"
                      register={register}
                      registerProps={{
                        required: true,
                        validate: (value) => value === watch('password'),
                      }}
                      onFocus={() => clearErrors('confirmPassword')}
                    />
                    {
                      errors.confirmPassword?.type === 'required'
                        ? <p className={styles.error}>Confirm Password is required</p>
                        : errors.confirmPassword?.type === 'validate'
                        && <p className={styles.error}>Passwords do not match</p>
                    }
                  </div>
                  <div className={styles.container__avatars}>
                    <div className={styles.container__label__avatar}>
                      <p>
                        Avatar
                      </p>
                    </div>
                    <Carousel
                      slides={AVATARS}
                      colorLeft={width < 768 ? '#EDF2F4' : '#2B2D42'}
                      colorRight={width < 768 ? '#EDF2F4' : '#2B2D42'}
                      currentSlide={currentSlide}
                      setCurrentSlide={(value) => {
                        setCurrentSlide(value);
                        setAvatar(AVATARS[value].image);
                      }}
                    />
                  </div>
                  <input
                    type="submit"
                    className={styles.input__submit}
                    value="Sign Up"
                  />
                </div>
              </form>
              <Link
                to="/sign-in"
                className={styles.component__link}
              >
                Already have an account ? Sign In
              </Link>
            </div>
          </div>
        </div>
      )}
      {redirect && <Message />}
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
