import React from 'react';

import styles from './information.module.css';

function Information({
  title,
  value,
}) {
  return (
    <div className={styles.container__information}>
      <div className={styles.title__container}>
        <p>{title}</p>
      </div>
      <p
        className={styles.container__text}
      >
        {value}
      </p>
    </div>
  );
}

export default Information;
