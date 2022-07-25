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

import Pokebola from '../../assets/pokebola.webp';

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
          loading="lazy"
          className={styles.image}
        />
      )
        : (
          <img
            src={Pokebola}
            alt={title}
            loading="lazy"
            className={styles.image}
          />
        )}
      <div className={styles.container__name}>
        <p>
          {title}
        </p>
      </div>
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
          Learn More
        </Button>
      </div>
    </div>
  );
}

export default Card;
