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
  getMyPokemons,
  deletePokemon,
} from '../../libs/pokemon';

import useWindowDimensions from '../../customHooks/useWindowDimensions';

import styles from './mypokemon.module.css';

function MyPokemon() {
  const [pokemons, setPokemons] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const {
    width,
  } = useWindowDimensions();

  async function getAllMyPokemons() {
    try {
      setLoading(true);
      const query = {
        page,
      };

      const response = await getMyPokemons(query);

      if (response) {
        setTotalPages(response.totalPages);
        setPokemons(response.docs);
      }
    } catch (e) {
      console.info('Error: ', e);
    } finally {
      setLoading(false);
    }
  }

  async function deleteMyPokemon(pokemonId) {
    try {
      const response = await deletePokemon(pokemonId);

      if (page !== 1 && pokemons.length === 1) {
        setPage((oldPage) => oldPage - 1);
      }

      if (response && response.ok) {
        setAlert({
          severity: 'success',
          message: 'Pokemon Successfully Deleted',
        });
      }
    } catch (e) {
      console.info('Error: ', e);
    } finally {
      getAllMyPokemons();
    }
  }

  useEffect(() => {
    getAllMyPokemons();
  }, [
    page,
  ]);

  return (
    <Screen>
      <div
        style={{
          height: ((pokemons.length >= 0 && pokemons.length <= 8) && (width > 768)) ? '100vh' : ((pokemons.length >= 8 && pokemons.length <= 12) && (width > 992)) && '100vh',
        }}
        className={styles.container}
      >
        {pokemons.length > 0 && (
          <div>
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
            <div className={styles.container__cards}>
              {pokemons.map((item) => (
                <div key={item._id} className={styles.container__card}>
                  <Card
                    image={item.image}
                    title={item.name}
                    attack={item.attack}
                    toDelete
                    id={item._id}
                    onClick={() => deleteMyPokemon(item._id)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        {pokemons.length === 0 && (
          <div className={styles.container__no__mypokemon}>
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
      {loading && <Loading />}
    </Screen>
  );
}

export default MyPokemon;
