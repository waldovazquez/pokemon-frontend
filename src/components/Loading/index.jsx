import React from 'react';

import {
  CircularProgress,
} from '@mui/material';

import styles from './loading.module.css';

function Loading() {
  return (
    <div className={styles.loading}>
      <CircularProgress />
    </div>
  );
}

export default Loading;
