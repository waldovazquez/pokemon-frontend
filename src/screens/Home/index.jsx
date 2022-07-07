import React, {
  useState,
  useEffect,
} from 'react';

import axios from 'axios';

import {
  useSearchParams,
} from 'react-router-dom';

import {
  Pagination,
} from '@mui/material';

import Screen from '../../components/Screen';
import Loading from '../../components/Loading';
import Card from '../../components/Card';

import {
  API_URL,
} from '../../utils/constants';

import styles from './home.module.css';

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  async function getPokemons() {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/pokemon/getallpokemons?page=${page}`);
      if (response && response.data) {
        setPokemons(response.data.docs);
      }
    } catch (e) {
      console.info('Error: ', e);
    } finally {
      setLoading(false);
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
  }, [searchParams]);

  return (
    <Screen>
      <div
        styles={{
          height: pokemons.length < 12 && '90vh',
        }}
        className={styles.container}
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
          count={47}
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
      { loading && <Loading />}
    </Screen>
  );
}

export default Home;
