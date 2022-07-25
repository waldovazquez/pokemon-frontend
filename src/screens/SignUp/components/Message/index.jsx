import React, {
  useState,
  useEffect,
} from 'react';

import {
  useNavigate,
} from 'react-router-dom';

import {
  LOGO_URL,
} from '../../../../utils/constants';

import styles from './message.module.css';

function Message() {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(3);

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
    <div className={styles.container__message}>
      <div className={styles.subcontainer__message}>
        <div className={styles.container__message__image}>
          <img
            src={LOGO_URL}
            alt="logoRedirect"
            className={styles.message__image}
          />
        </div>
        <p className={styles.message}>{`You will be redirected to the login screen in ${seconds} seconds`}</p>
      </div>
    </div>
  );
}

export default Message;
