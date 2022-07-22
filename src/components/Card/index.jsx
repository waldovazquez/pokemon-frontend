import React from 'react';

import {
  useNavigate,
} from 'react-router-dom';

import {
  MdFavorite,
} from 'react-icons/md';

import {
  IoMdTrash,
} from 'react-icons/io';

import {
  IconButton,
  Tooltip,
} from '@mui/material';

import Button from '../Button';

import Pokebola from '../../assets/pokebola.png';

import styles from './card.module.css';

import {
  getFormat,
} from '../../utils/formats';

function Card({
  image,
  title,
  attack,
  id,
  toDelete = false,
  onClick = () => { },
}) {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.attack}>
        <p className={styles.attack__number}>
          {getFormat(attack, 'card')}
        </p>
      </div>
      {image ? (
        <img
          src={image}
          alt={title}
          height={200}
          width={200}
        />
      )
        : (
          <img
            src={Pokebola}
            alt={title}
            height={200}
            width={240}
            style={{
              objectFit: 'contain',
            }}
          />
        )}
      <p className={styles.name}>
        {title}
      </p>
      <div className={styles.container__bottom}>
        {!toDelete ? (
          <Tooltip title="Favorite">
            <IconButton aria-label="Favorite" onClick={() => onClick()}>
              <MdFavorite className={styles.icon} />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete" onClick={() => onClick()}>
              <IoMdTrash className={styles.icon} />
            </IconButton>
          </Tooltip>
        )}
        <Button
          onClick={() => navigate(`/pokemon/${id}`)}
          className={styles.component__button}
        >
          More Details
        </Button>
      </div>
    </div>
  );
}

export default Card;
