import React, {
  useState,
  useEffect,
} from 'react';

import {
  Pagination,
} from '@mui/material';

import Screen from '../../components/Screen';
import Loading from '../../components/Loading';
import Toast from '../../components/Toast';
import Card from '../../components/Card';

import {
  getFavorites,
  deleteFavorite,
} from '../../libs/favorite';

import useWindowDimensions from '../../customHooks/useWindowDimensions';

import {
  getHeight,
} from '../../utils/formats';

import styles from './favorites.module.css';

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [alert, setAlert] = useState(null);
  const {
    width,
  } = useWindowDimensions();

  async function getAllFavorites() {
    try {
      const query = {
        page,
      };

      const response = await getFavorites(query);

      if (response) {
        setTotalPages(response.totalPages);
        setFavorites(response.docs);
      }
    } catch (e) {
      console.info('Error: ', e);
    }
  }

  async function deleteFav(favoriteId) {
    try {
      const response = await deleteFavorite(favoriteId);

      if (page !== 1 && favorites.length === 1) {
        setPage((oldPage) => oldPage - 1);
      }

      if (response && response.ok) {
        setAlert({
          severity: 'success',
          message: 'Favorite Successfully Deleted',
        });
      }
    } catch (e) {
      console.info('Error: ', e);
    } finally {
      getAllFavorites();
    }
  }

  useEffect(() => {
    getAllFavorites();
  }, [
    page,
  ]);

  return (
    <Screen>
      <div
        className={styles.container}
        style={{
          height: getHeight(favorites, width),
        }}
      >
        {favorites.length > 0 && (
          <>
            <div className={styles.container__pagination}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(_event, value) => {
                  setPage(value);
                }}
                sx={{
                  backgroundColor: '#EDF2F4',
                  borderRadius: '12px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                }}
                size="small"
              />
            </div>
            <div className={styles.container__cards}>
              {favorites.map((item) => (
                <div key={item._id}>
                  <Card
                    image={item.pokemon.image}
                    title={item.pokemon.name}
                    attack={item.pokemon.attack}
                    toDelete
                    id={item.pokemon._id}
                    onClick={() => deleteFav(item._id)}
                  />
                </div>
              ))}
            </div>
          </>
        )}
        {favorites.length === 0 && (
          <div className={styles.container__no__favorites}>
            <p>
              No Pokemons
            </p>
          </div>
        )}
      </div>
      {alert && (
        <Toast
          severity={alert.severity}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
      <Loading />
    </Screen>
  );
}

export default Favorites;
