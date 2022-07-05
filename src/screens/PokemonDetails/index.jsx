import React, {
  useState,
  useEffect,
} from 'react';

import {
  useParams,
} from 'react-router-dom';

import axios from 'axios';

import Screen from '../../components/Screen';

import {
  API_URL,
} from '../../utils/constants';

function PokemonDetails() {
  const [details, setDetails] = useState({});
  const {
    id,
  } = useParams();

  async function getDetails() {
    try {
      const response = await axios.get(`${API_URL}/pokemon/getbyid?id=${id}`);
      if (response && response.data.ok) {
        setDetails(response.data.data);
      }
    } catch (e) {
      console.info('Error', e);
    }
  }

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <Screen>
      <p>
        {id}
      </p>
    </Screen>
  );
}

export default PokemonDetails;
