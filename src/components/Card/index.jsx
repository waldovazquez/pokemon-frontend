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

function Card({
  image,
  title,
  id,
  favorite = false,
  onClick = () => {},
}) {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
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
      <p style={{
        textTransform: 'uppercase',
        color: '#2B2D42',
        textAlign: 'center',
      }}
      >
        {title}
      </p>
      <div className={styles.container__bottom}>
        {!favorite ? (
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
