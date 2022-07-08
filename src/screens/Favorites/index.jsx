import React, {
  useState,
  useEffect,
  useContext,
} from 'react';

import axios from 'axios';

import {
  Pagination,
} from '@mui/material';

import AuthContext from '../../context/authContext';

import Screen from '../../components/Screen';
import Loading from '../../components/Loading';
import Toast from '../../components/Toast';
import Card from '../../components/Card';

import {
  API_URL,
} from '../../utils/constants';

import styles from './favorites.module.css';

function Favorites() {
  const {
    data,
  } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  async function getFavorites() {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/favorites/getallfavorites?page=${page}?userId=${data.userData._id}`);
      if (response && response.data) {
        setTotalPages(response.data.totalPages);
        setFavorites(response.data.docs);
      }
    } catch (e) {
      console.info('Error: ', e);
    } finally {
      setLoading(false);
    }
  }

  async function deleteFavorite(favoriteId) {
    try {
      const response = await axios.delete(`${API_URL}/favorites/delete`, {
        data: {
          id: favoriteId,
        },
      });
      if (response && response.data.ok) {
        setAlert({
          severity: 'success',
          message: 'Favorite Successfully Deleted',
        });
      }
    } catch (e) {
      console.info('Error: ', e);
    } finally {
      getFavorites();
    }
  }

  useEffect(() => {
    getFavorites();
  }, [
    page,
  ]);

  return (
    <Screen>
      <div
        style={{
          height: favorites.length < 12 && '90vh',
        }}
        className={styles.container}
      >
        {
          favorites && favorites.map((item) => (
            <div
              key={item._id}
              style={{
                margin: '6px',
              }}
            >
              <Card
                image={item.pokemon.image}
                favorite
                title={item.pokemon.name}
                id={item.pokemon._id}
                onClick={() => deleteFavorite(item._id)}
              />
            </div>
          ))
        }
      </div>
      <div style={{
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      >
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_event, value) => {
            setPage(value);
          }}
          sx={{
            backgroundColor: '#EFF6EE',
            borderRadius: '12px',
          }}
          size="large"
        />
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
      { loading && <Loading />}
    </Screen>
  );
}

export default Favorites;
