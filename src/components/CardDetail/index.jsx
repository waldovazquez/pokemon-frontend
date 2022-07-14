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
    <div className={styles.container}>
      {image ? (
        <img
          src={image}
          alt={name}
          height={450}
          width={450}
        />
      ) : (
        <img
          src={Pokebola}
          alt="pokebola"
          height={500}
          width={500}
        />
      )}
      <div className={styles.subcontainer}>
        <Information title="attack" value={attack} />
        <Information title="defense" value={defense} />
        <Information title="height" value={height} />
        <Information title="hp" value={hp} />
        <Information title="speed" value={speed} />
        <Information title="weight" value={weight} />
        <div className={styles.container__types}>
          <p className={styles.type__title}>
            TYPES
          </p>
          {
            types && types.map((item) => (
              <div key={item._id} className={styles.types}>
                <p>{item.name}</p>
              </div>
            ))
        }
        </div>
      </div>
    </div>
  );
}

export default CardDetail;
