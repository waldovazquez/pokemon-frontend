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
  getByUserId,
  deletePokemon,
} from '../../libs/pokemon';

import useWindowDimensions from '../../customHooks/useWindowDimensions';

import styles from './mypokemon.module.css';

function MyPokemon() {
  const {
    data,
  } = useContext(AuthContext);
  const [pokemons, setPokemons] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const { width } = useWindowDimensions();

  async function getAllMyPokemons() {
    try {
      setLoading(true);
      const response = await getByUserId(data.userData._id);

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
          height: width > 768 && '100vh',
        }}
        className={styles.container}
      >
        <div className={styles.container__cards}>
          {
            pokemons && pokemons.length > 0 ? pokemons.map((item) => (
              <div key={item._id}>
                <Card
                  image={item.image}
                  title={item.name}
                  attack={item.attack}
                  id={item._id}
                  toDelete
                  onClick={() => deleteMyPokemon(item._id)}
                />
              </div>
            )) : (
              <div className={styles.container__no__mypokemon}>
                <p>
                  No Pokemons
                </p>
              </div>
            )
          }
        </div>
        {pokemons && pokemons.length > 0 && (
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

export default MyPokemon;
