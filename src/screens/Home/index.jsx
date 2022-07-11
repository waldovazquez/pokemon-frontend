import React, {
  useState,
  useEffect,
  useContext,
} from 'react';

import axios from 'axios';

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

import {
  API_URL,
} from '../../utils/constants';

import Search from '../../assets/search.png';

import styles from './home.module.css';

function Home() {
  const {
    data,
  } = useContext(AuthContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [alert, setAlert] = useState(null);

  async function getPokemons() {
    try {
      setLoading(true);
      const filters = {};
      if (query) {
        filters.query = query;
      }
      filters.page = page;

      const response = await axios.get(`${API_URL}/pokemon/getallpokemons`, {
        params: filters,
      });

      if (response && response.data) {
        setTotalPages(response.data.totalPages);
        setPokemons(response.data.docs);
      }
    } catch (e) {
      console.info('Error: ', e);
    } finally {
      setLoading(false);
    }
  }

  async function addToFavorites(pokemonId) {
    try {
      const response = await axios.post(`${API_URL}/favorites/create`, {
        pokemonId,
        userId: data.userData._id,
      });
      if (response && response.data.ok) {
        setAlert({
          severity: 'success',
          message: 'Favorite Successfully Created',
        });
      }
    } catch (e) {
      console.info('Error: ', e);
    }
  }

  function handlePage(value) {
    let search = null;
    if (value) {
      search = {
        page: value,
      };
    }
    setPage(value);
    setSearchParams(search, { replace: true });
  }

  useEffect(() => {
    getPokemons();
  }, [
    page,
    query,
  ]);

  useEffect(() => {
    const pageQuery = searchParams.get('page');
    if (pageQuery) {
      if (page !== Number(pageQuery)) {
        handlePage(Number(pageQuery));
      }
    } else {
      handlePage(1);
    }
  }, [
    searchParams,
  ]);

  return (
    <Screen>
      <div
        style={{
          height: pokemons.length < 12 && '90vh',
        }}
        className={styles.container}
      >
        <div
          className={styles.container__search}
        >
          <Input
            placeholder="Search..."
            activeIcon
            icon={Search}
            alt="search"
            className={styles.component__input}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div
          className={styles.container__cards}
        >
          {
            pokemons && pokemons.map((item) => (
              <div
                key={item._id}
                style={{
                  margin: '6px',
                }}
              >
                <Card
                  image={item.image}
                  title={item.name}
                  id={item._id}
                  onClick={() => addToFavorites(item._id)}
                />
              </div>
            ))
          }
        </div>
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
          onChange={(event, value) => {
            handlePage(value);
          }}
          sx={{
            backgroundColor: '#EFF6EE',
            borderRadius: '12px',
          }}
          size="medium"
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

export default Home;
