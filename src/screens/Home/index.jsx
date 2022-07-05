import React, {
  useState,
  useEffect,
} from 'react';

import axios from 'axios';

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

  useEffect(() => {
    getPokemons();
  }, [
    page,
  ]);

  return (
    <Screen>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}
      >
        {
          pokemons && pokemons.map((item) => (
            <div
              key={item._id}
              style={{
                margin: '20px',
              }}
            >
              <Card
                image={item.image}
                title={item.name}
                malId={item._id}
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
        <Pagination count={47} onChange={(event, value) => setPage(value)} />
      </Stack>
      { loading && <Loading />}
    </Screen>
  );
}

export default Home;
