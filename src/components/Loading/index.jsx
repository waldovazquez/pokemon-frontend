import React, {
  useEffect,
  useState,
} from 'react';

import {
  CircularProgress,
} from '@mui/material';

import api from '../../libs/api';

import styles from './loading.module.css';

function Loading() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.interceptors.request.use((config) => {
      setLoading(true);
      return config;
    }, (error) => Promise.reject(error));

    api.interceptors.response.use((response) => {
      setLoading(false);
      return response;
    }, (error) => Promise.reject(error));
  }, []);

  if (loading) {
    return (
      <div className={styles.loading}>
        {loading && <CircularProgress />}
      </div>
    );
  }

  return null;
}

export default Loading;
