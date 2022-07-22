import React, {
  useState,
  useContext,
  useEffect,
} from 'react';

import AuthContext from '../../context/authContext';

import Screen from '../../components/Screen';
import Input from '../../components/Input';
import Toast from '../../components/Toast';
import Button from '../../components/Button';
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
    updatingData,
  } = useContext(AuthContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  async function getProfile() {
    try {
      setLoading(true);
      const response = await getByToken(data.token);
      if (response && response.ok) {
        setFirstName(response.userData.firstName);
        setLastName(response.userData.lastName);
        setEmail(response.userData.email);
        setAvatar(response.userData.avatar);
        setCurrentSlide(AVATARS.findIndex((av) => av.image === data.userData.avatar));
      }
    } catch (e) {
      console.info('Error', e);
    } finally {
      setLoading(false);
    }
  }

  async function handleProfileUpdate() {
    try {
      if (newPassword === confirmPassword) {
        const dataToSave = {
          firstName,
          lastName,
          email,
          avatar,
          currentPassword,
          password: newPassword,
          userId: data.userData._id,
        };
        setLoading(true);
        const response = await update(dataToSave);
        if (response && response.ok) {
          updatingData(data.token);
          setAlert({
            severity: 'success',
            message: 'User Successfully Updated',
          });
        }
      } else {
        setAlert({
          severity: 'error',
          message: 'Passwords do not match',
        });
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
  }

  useEffect(() => {
    if (data.userData) {
      getProfile();
    }
  }, [data.userData]);

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
          <div className={styles.container__input}>
            <Input
              type="text"
              label="Firstname"
              labelColor="#2B2D42"
              placeholder="Firstname *"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Input
              type="text"
              label="Lastname"
              labelColor="#2B2D42"
              placeholder="Lastname *"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <Input
              type="email"
              label="Email"
              labelColor="#2B2D42"
              placeholder="Email *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              label="Current Password"
              labelColor="#2B2D42"
              placeholder="Current Password *"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <Input
              type="password"
              label="New Password"
              labelColor="#2B2D42"
              placeholder="New Password *"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Input
              type="password"
              label="Confirm Password"
              labelColor="#2B2D42"
              placeholder="Confirm Password *"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            onClick={() => handleProfileUpdate()}
            disabled={loading}
          >
            Update Profile
          </Button>
        </div>
      </div>
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

export default Profile;
