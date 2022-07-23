import React from 'react';

import Information from './components/Information';

import Pokebola from '../../assets/pokebola.png';

import styles from './carddetail.module.css';

function CardDetail({
  attack,
  defense,
  height,
  hp,
  image,
  name,
  speed,
  types,
  weight,
}) {
  return (
    <div className={styles.container__details}>
      <div className={styles.container__image}>
        {image ? (
          <img
            src={image}
            alt={name}
            className={styles.image}
          />
        ) : (
          <img
            src={Pokebola}
            alt="pokebola"
            className={styles.image}
          />
        )}
      </div>
      <div className={styles.subcontainer}>
        <Information title="attack" value={attack} />
        <Information title="defense" value={defense} />
        <Information title="height" value={height} />
        <Information title="hp" value={hp} />
        <Information title="speed" value={speed} />
        <Information title="weight" value={weight} />
      </div>
      <div className={styles.container__types}>
        <p className={styles.type__title}>
          TYPES
        </p>
        {
          types && types.filter((item) => item !== null).length > 0 ? types.map((item) => (
            <div key={item._id} className={styles.types}>
              <p>{item.name}</p>
            </div>
          )) : <p>Doesn&apos;t have</p>
        }
      </div>
    </div>
  );
}

export default CardDetail;
