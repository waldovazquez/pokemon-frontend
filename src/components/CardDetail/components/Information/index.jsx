import React from 'react';

import styles from './information.module.css';

function Information({
  title,
  value,
}) {
  return (
    <div className={styles.container__information}>
      <div className={styles.title__container}>
        <p className={styles.title}>
          {title}
        </p>
      </div>
      <div className={styles.container__text}>
        <p className={styles.value}>
          {value}
        </p>
      </div>
    </div>
  );
}

export default Information;
