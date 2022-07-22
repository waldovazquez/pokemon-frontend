import React, {
  useState,
  useEffect,
  useContext,
} from 'react';

import {
  v4 as uuidv4,
} from 'uuid';

import {
  useSearchParams,
} from 'react-router-dom';

import {
  Pagination,
} from '@mui/material';

import AuthContext from '../../context/authContext';

import Screen from '../../components/Screen';
import Loading from '../../components/Loading';
import Card from '../../components/Card';
import Toast from '../../components/Toast';
import Input from '../../components/Input';
import Dropdown from '../../components/Dropdown';

import {
  getAllPokemons,
} from '../../libs/pokemon';

import {
  createFavorite,
} from '../../libs/favorite';

import {
  getTypes,
} from '../../libs/type';

import useHandleUrl from '../../customHooks/useHandleUrl';

import styles from './home.module.css';

function Home() {
  const {
    data,
  } = useContext(AuthContext);
  const [searchParams] = useSearchParams();
  const {
    handleUrl,
  } = useHandleUrl();
  const [pokemons, setPokemons] = useState([]);
  const [types, setTypes] = useState([]);
  const [search, setSearch] = useState(searchParams.get('name') || '');
  const [typeSelected, setTypeSelected] = useState(searchParams.get('type') || '');
  const [orderSelected, setOrderSelected] = useState(searchParams.get('attack') || '');
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  async function getPokemons() {
    try {
      setLoading(true);
      const filters = {};
      let q = '';

      if (searchParams.get('name')) {
        q += `name:${searchParams.get('name')},`;
      }

      if (searchParams.get('type')) {
        q += `types.name:${searchParams.get('type')},`;
      }

      if (searchParams.get('attack')) {
        q += `attack:${searchParams.get('attack')},`;
      }

      if (q !== '') {
        filters.query = q;
      }

      filters.page = Number(searchParams.get('page')) || 1;

      const response = await getAllPokemons(filters);

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

  async function addToFavorites(pokemonId) {
    try {
      const response = await createFavorite({
        pokemonId,
        userId: data.userData._id,
      });
      if (response && response.ok) {
        setAlert({
          severity: 'success',
          message: 'Favorite Successfully Created',
        });
      }
    } catch (e) {
      console.info('Error: ', e);
    }
  }

  async function getAllTypes() {
    try {
      const response = await getTypes();
      if (response && response.ok) {
        const newTypes = [
          {
            label: 'All',
            value: '',
            id: uuidv4(),
          },
          ...response.data.map((i) => ({
            label: i.name[0].toUpperCase() + i.name.slice(1),
            value: i.name,
            id: i._id,
          })),
        ];
        setTypes(newTypes);
      }
    } catch (e) {
      console.info('Error: ', e);
    }
  }

  useEffect(() => {
    getAllTypes();
  }, []);

  useEffect(() => {
    setOrderSelected(searchParams.get('attack') || '');
    setTypeSelected(searchParams.get('type') || '');
    setPage(Number(searchParams.get('page')) || 1);
    setSearch(searchParams.get('name') || '');
    getPokemons();
  }, [
    searchParams.get('type'),
    searchParams.get('attack'),
    searchParams.get('name'),
    searchParams.get('page'),
  ]);

  return (
    <Screen>
      <div className={styles.container}>
        <div className={styles.container__filters}>
          <div className={styles.container__search}>
            <Input
              placeholder="Search..."
              label="Search"
              labelRow
              alt="search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                handleUrl(e.target.value, 'name');
                if (page !== 1) setPage(1);
              }}
            />
          </div>
          <div className={styles.container__dropdown__types}>
            <Dropdown
              title="Types"
              options={types}
              value={typeSelected}
              onChange={(e) => {
                setTypeSelected(e);
                handleUrl(e, 'type');
                if (page !== 1) setPage(1);
              }}
            />
          </div>
          <div className={styles.container__dropdown__attack}>
            <Dropdown
              title="Order by Attack"
              options={[
                {
                  label: 'All',
                  value: '',
                  id: uuidv4(),
                },
                {
                  label: 'Highest',
                  value: 'desc',
                  id: uuidv4(),
                }, {
                  label: 'Lowest',
                  value: 'asc',
                  id: uuidv4(),
                },
              ]}
              value={orderSelected}
              onChange={(e) => {
                setOrderSelected(e);
                handleUrl(e, 'attack');
                if (page !== 1) setPage(1);
              }}
            />
          </div>
        </div>
        <div className={styles.container__cards}>
          {
            pokemons && pokemons.length > 0 ? pokemons.map((item) => (
              <div key={item._id}>
                <Card
                  image={item.image}
                  attack={item.attack || 0}
                  title={item.name}
                  id={item._id}
                  onClick={() => addToFavorites(item._id)}
                />
              </div>
            )) : (
              <div className={styles.container__no__pokemons}>
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
                setPage(Number(value));
                handleUrl(value, 'page');
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

export default Home;
