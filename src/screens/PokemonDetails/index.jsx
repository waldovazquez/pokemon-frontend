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
  const [loading, setLoading] = useState(false);

  async function getDetails() {
    try {
      setLoading(true);
      const response = await getById(id);
      if (response && response.ok) {
        setDetails(response.data);
      }
    } catch (e) {
      console.info('Error', e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <Screen safe={(details && details.types && details.types.length <= 10) || loading}>
      <div className={styles.container}>
        {Object.keys(details).length > 0 && (
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
