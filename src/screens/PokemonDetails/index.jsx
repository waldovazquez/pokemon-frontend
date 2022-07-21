import React, {
  useState,
  useEffect,
} from 'react';

import {
  useParams,
} from 'react-router-dom';

import Screen from '../../components/Screen';
import CardDetail from '../../components/CardDetail';

import {
  getById,
} from '../../libs/pokemon';

import styles from './pokemondetails.module.css';

function PokemonDetails() {
  const [details, setDetails] = useState({});
  const {
    id,
  } = useParams();

  async function getDetails() {
    try {
      const response = await getById(id);
      if (response && response.ok) {
        setDetails(response.data);
      }
    } catch (e) {
      console.info('Error', e);
    }
  }

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <Screen
      safe
    >
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
