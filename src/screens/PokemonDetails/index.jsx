import React, {
  useState,
  useEffect,
} from 'react';

import {
  useParams,
} from 'react-router-dom';

import axios from 'axios';

import Screen from '../../components/Screen';
import CardDetail from '../../components/CardDetail';

import {
  API_URL,
} from '../../utils/constants';

import styles from './pokemondetails.module.css';

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
      <div
        className={styles.container}
      >
        {details && (
        <CardDetail
          attack={details.attack}
          defense={details.defense}
          height={details.height}
          hp={details.hp}
          image={details.image}
          name={details.name}
          speed={details.speed}
          types={details.types}
          weight={details.weight}
        />
        )}
      </div>
    </Screen>
  );
}

export default PokemonDetails;
