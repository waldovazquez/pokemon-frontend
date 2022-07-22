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

import {
  measurementFormat,
  getFormat,
} from '../../utils/formats';

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
    <Screen>
      <div className={styles.container}>
        {details && (
          <CardDetail
            attack={getFormat(details.attack)}
            defense={getFormat(details.defense)}
            height={measurementFormat(details.height, 'height')}
            hp={getFormat(details.hp)}
            image={details.image}
            name={details.name}
            speed={getFormat(details.speed, 'speed')}
            types={details.types}
            weight={measurementFormat(details.weight, 'weight')}
          />
        )}
      </div>
    </Screen>
  );
}

export default PokemonDetails;
