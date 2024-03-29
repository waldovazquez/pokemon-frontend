import React, {
  useState,
  useContext,
  useEffect,
} from 'react';

import {
  useForm,
} from 'react-hook-form';

import AuthContext from '../../context/authContext';

import Screen from '../../components/Screen';
import Input from '../../components/Input';
import Toast from '../../components/Toast';
import Carousel from '../../components/Carousel';

import styles from './profile.module.css';

import {
  AVATARS,
} from '../../utils/constants';

import {
  getByToken,
  update,
} from '../../libs/user';

function Profile() {
  const {
    data,
    validateToken,
  } = useContext(AuthContext);
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
    reset,
  } = useForm();
  const [avatar, setAvatar] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [alert, setAlert] = useState(null);

  async function getProfile() {
    try {
      const response = await getByToken();

      if (response && response.ok) {
        setValue('firstName', response.userData.firstName);
        setValue('lastName', response.userData.lastName);
        setValue('email', response.userData.email);
        setAvatar(response.userData.avatar);
        setCurrentSlide(AVATARS.findIndex((av) => av.image === response.userData.avatar));
      }
    } catch (e) {
      console.info('Error', e);
    }
  }

  async function handleProfileUpdate(dataForm) {
    try {
      const response = await update({
        ...dataForm,
        avatar,
      });
      if (response && response.ok) {
        const isValid = await validateToken(data.token);
        if (isValid) {
          return setAlert({
            severity: 'success',
            message: 'User Successfully Updated',
          });
        }
      }
      if (response && !response.ok) {
        setAlert({
          message: 'The passwords are equal',
        });
      }
    } catch (e) {
      console.info('Error', e);
      setAlert({
        message: 'Something is wrong',
      });
    } finally {
      reset({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    }
    return null;
  }

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <Screen safe>
      <div className={styles.container}>
        <div className={styles.subcontainer}>
          <Carousel
            slides={AVATARS}
            currentSlide={currentSlide}
            setCurrentSlide={(value) => {
              setCurrentSlide(value);
              setAvatar(AVATARS[value].image);
            }}
            style={{
              width: '100%',
            }}
          />
          <form
            className={styles.form}
            onSubmit={handleSubmit(handleProfileUpdate)}
          >
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
              />
              {
                errors.lastName?.type === 'required'
                && <p className={styles.error}>Last Name is required</p>
              }
            </div>
            <div className={styles.container__input}>
              <Input
                type="text"
                name="email"
                label="Email"
                placeholder="Email *"
                register={register}
                registerProps={{
                  required: true,
                }}
              />
              {
                errors.email?.type === 'required'
                && <p className={styles.error}>Email is required</p>
              }
            </div>
            <div className={styles.container__input}>
              <Input
                type="password"
                name="currentPassword"
                label="Current Password"
                placeholder="Current Password *"
                register={register}
                registerProps={{
                  required: true,
                }}
              />
              {
                errors.currentPassword?.type === 'required'
                && <p className={styles.error}>Current Password is required</p>
              }
            </div>
            <div className={styles.container__input}>
              <Input
                type="password"
                name="newPassword"
                label="New Password"
                placeholder="New Password *"
                register={register}
              />
            </div>
            <div className={styles.container__input}>
              <Input
                type="password"
                name="confirmPassword"
                label="Confirm Password"
                placeholder="Confirm Password *"
                register={register}
                registerProps={{
                  validate: (value) => value === watch('newPassword'),
                }}
              />
              {
                errors.confirmPassword?.type === 'required'
                  ? <p className={styles.error}>Confirm Password is required</p>
                  : errors.confirmPassword?.type === 'validate'
                  && <p className={styles.error}>Passwords do not match</p>
              }
            </div>
            <input
              type="submit"
              className={styles.input__submit}
              value="Update Profile"
            />
          </form>
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

export default Profile;
