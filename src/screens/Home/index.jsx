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

import styles from './home.module.css';

function Home() {
  const {
    data,
  } = useContext(AuthContext);
  const [searchParams, setSearchParams] = useSearchParams();
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

      if (search !== '') {
        q += `name:${search},`;
      }

      if (typeSelected !== '') {
        q += `types.name:${typeSelected},`;
      }

      if (orderSelected !== '') {
        q += `attack:${orderSelected},`;
      }

      if (q !== '') {
        filters.query = q;
      }

      filters.page = page;

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

  function handleUrl(value = null, param = null) {
    const newSearch = {};
    const typeQuery = searchParams.get('type');
    const nameQuery = searchParams.get('name');
    const attackQuery = searchParams.get('attack');
    if (param) {
      switch (param) {
        case 'page':
          if (value) {
            newSearch.page = value;
          }
          if (typeQuery) {
            newSearch.type = typeQuery;
          }
          if (nameQuery) {
            newSearch.name = nameQuery;
          }
          if (attackQuery) {
            newSearch.attack = attackQuery;
          }
          break;
        case 'type':
          if (value !== '') {
            newSearch.type = value;
          }
          if (nameQuery) {
            newSearch.name = nameQuery;
          }
          if (attackQuery) {
            newSearch.attack = attackQuery;
          }
          setPage(1);
          break;
        case 'attack':
          if (value !== '') {
            newSearch.attack = value;
          }
          if (nameQuery) {
            newSearch.name = nameQuery;
          }
          if (typeQuery) {
            newSearch.type = typeQuery;
          }
          setPage(1);
          break;
        case 'name':
          if (value) {
            newSearch.name = value;
          }
          if (typeQuery) {
            newSearch.type = typeQuery;
          }
          if (attackQuery) {
            newSearch.attack = attackQuery;
          }
          break;
        default:
          return null;
      }
    }
    setSearchParams(newSearch, {
      replace: true,
    });
    return null;
  }

  useEffect(() => {
    getAllTypes();
  }, []);

  useEffect(() => {
    getPokemons();
  }, [
    page,
    search,
    typeSelected,
    orderSelected,
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
