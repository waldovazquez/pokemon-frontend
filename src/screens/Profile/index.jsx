import React, {
  useState,
  useContext,
  useEffect,
} from 'react';

import Slider from 'react-slick';

import AuthContext from '../../context/authContext';

import Screen from '../../components/Screen';
import Input from '../../components/Input';
import Toast from '../../components/Toast';
import Button from '../../components/Button';

import NextArrow from './components/nextArrow';
import PrevArrow from './components/prevArrow';

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
  const [avatar, setAvatar] = useState(AVATARS[AVATARS.indexOf(data.userData.avatar)] || AVATARS[0]);
  const [initialSlide] = useState(AVATARS.indexOf(data.userData.avatar) || 0);
  const [alert, setAlert] = useState(null);

  async function getProfile() {
    try {
      const response = await getByToken(data.token);
      if (response && response.ok) {
        setFirstName(response.userData.firstName);
        setLastName(response.userData.lastName);
        setEmail(response.userData.email);
      }
    } catch (e) {
      console.info('Error', e);
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
    }
  }

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <Screen
      safe
    >
      <div className={styles.container}>
        <div className={styles.subcontainer}>
          <div style={{
            width: '125px',
          }}
          >
            <Slider
              dots={false}
              infinite
              speed={500}
              initialSlide={initialSlide}
              slidesToShow={1}
              slidesToScroll={1}
              afterChange={(index) => setAvatar(AVATARS[index])}
              nextArrow={<NextArrow />}
              prevArrow={<PrevArrow />}
            >
              {AVATARS.map((av) => (
                <div key={av}>
                  <img src={av} alt="pokemon" />
                </div>
              ))}
            </Slider>
          </div>
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
