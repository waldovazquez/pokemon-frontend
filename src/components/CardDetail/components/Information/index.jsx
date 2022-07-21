import React from 'react';

import styles from './information.module.css';

import {
  getFormat,
} from '../../../../utils/functions';

function Information({
  title,
  value,
}) {
  return (
    <div className={styles.container__information}>
      <div className={styles.title__container}>
        <p className={styles.title}>{title}</p>
      </div>
      <div className={styles.container__text}>
        <p className={styles.value}>
          {getFormat(title, value)}
        </p>
      </div>
    </div>
  );
}

export default Information;
