import React, {
  useState,
  useEffect,
} from 'react';

import {
  useSearchParams,
} from 'react-router-dom';

import {
  Pagination,
} from '@mui/material';

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
  getFavorites,
} from '../../libs/favorite';

import getTypes from '../../libs/type';

import useHandleUrl from '../../customHooks/useHandleUrl';
import useWindowDimensions from '../../customHooks/useWindowDimensions';

import {
  getHeight,
} from '../../utils/formats';

import styles from './home.module.css';

function Home() {
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
  const [myFavorites, setMyFavorites] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [alert, setAlert] = useState(null);
  const {
    width,
  } = useWindowDimensions();

  async function getPokemons() {
    try {
      const filters = {};
      let q = '';

      if (searchParams.get('name')) {
        q += `name:${searchParams.get('name')},`;
      }

      if (searchParams.get('type')) {
        q += `types.name:${searchParams.get('type')},`;
      }

      if (searchParams.get('attack')) {
        filters.sort = {
          by: 'attack',
          value: searchParams.get('attack'),
        };
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
    }
  }

  async function getMyFavorites() {
    try {
      const response = await getFavorites();
      if (response && response.ok) {
        setMyFavorites(response.favorites);
      }
    } catch (e) {
      console.info('Error', e);
    }
  }

  async function addToFavorites(pokemonId) {
    try {
      const response = await createFavorite({
        pokemonId,
      });
      if (response && response.ok) {
        setAlert({
          severity: 'success',
          message: 'Favorite Successfully Created',
        });
      } else {
        setAlert({
          message: 'You already have this pokemon in your favorites list',
        });
      }
    } catch (e) {
      console.info('Error: ', e);
    } finally {
      getMyFavorites();
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
            id: Math.floor(Math.random() * Date.now()),
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
    getMyFavorites();
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
      <div
        style={{
          height: getHeight(pokemons, width),
        }}
        className={styles.container}
      >
        <div className={styles.container__filters}>
          <div className={styles.container__search}>
            <Input
              placeholder="Search..."
              label="Search"
              labelRow
              alt="search"
              labelColor="#EDF2F4"
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
                  id: Math.floor(Math.random() * Date.now()),
                },
                {
                  label: 'Highest',
                  value: 'desc',
                  id: Math.floor(Math.random() * Date.now()),
                }, {
                  label: 'Lowest',
                  value: 'asc',
                  id: Math.floor(Math.random() * Date.now()),
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
        {pokemons.length > 0 && (
          <>
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
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                }}
                size="small"
              />
            </div>
            <div className={styles.container__cards}>
              {pokemons.map((item) => (
                <div key={item._id}>
                  <Card
                    image={item.image}
                    title={item.name}
                    attack={item.attack || 0}
                    id={item._id}
                    active={(myFavorites.filter((fav) => fav.pokemonId === item._id).length > 0)}
                    onClick={() => addToFavorites(item._id)}
                  />
                </div>
              ))}
            </div>
          </>
        )}
        {pokemons.length === 0 && (
          <div className={styles.container__no__pokemons}>
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

export default Home;
