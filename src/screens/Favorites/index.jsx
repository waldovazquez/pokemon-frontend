import React, {
  useState,
  useEffect,
  useContext,
} from 'react';

import {
  Pagination,
} from '@mui/material';

import AuthContext from '../../context/authContext';

import Screen from '../../components/Screen';
import Loading from '../../components/Loading';
import Toast from '../../components/Toast';
import Card from '../../components/Card';

import {
  getFavorites,
  deleteFavorite,
} from '../../libs/favorite';

import useWindowDimensions from '../../customHooks/useWindowDimensions';

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
  const { width } = useWindowDimensions();

  async function getAllFavorites() {
    try {
      setLoading(true);
      const response = await getFavorites({
        page,
        userId: data.userData._id,
      });
      if (response) {
        setTotalPages(response.totalPages);
        setFavorites(response.docs);
      }
    } catch (e) {
      console.info('Error: ', e);
    } finally {
      setLoading(false);
    }
  }

  async function deleteFav(favoriteId) {
    try {
      const response = await deleteFavorite(favoriteId);

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
        style={{
          height: width > 768 && '100vh',
        }}
        className={styles.container}
      >
        <div className={styles.container__cards}>
          {
            favorites && favorites.length > 0 ? favorites.map((item) => (
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
            )) : (
              <div className={styles.container__no__favorites}>
                <p>
                  No Pokemons
                </p>
              </div>
            )
          }
        </div>
        {favorites && favorites.length > 0 && (
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
              }}
              size="medium"
            />
          </div>
        )}
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
      {loading && <Loading />}
    </Screen>
  );
}

export default Favorites;
