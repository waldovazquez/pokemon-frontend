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
  Stack,
} from '@mui/material';

import Screen from '../../components/Screen';
import Loading from '../../components/Loading';
import Card from '../../components/Card';

import {
  API_URL,
} from '../../utils/constants';

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
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        height: pokemons.length < 12 && '90vh',
      }}
      >
        {
          pokemons && pokemons.map((item) => (
            <div
              key={item._id}
              style={{
                margin: '10px',
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
      <Stack
        spacing={2}
        sx={{
          height: '50px',
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
            backgroundColor: '#F02D3A',
            borderRadius: '12px',
          }}
          color="standard"
          size="large"
        />
      </Stack>
      { loading && <Loading />}
    </Screen>
  );
}

export default Home;
