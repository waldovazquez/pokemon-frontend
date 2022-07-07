import React from 'react';

import {
  useNavigate,
} from 'react-router-dom';

import {
  MdFavorite,
} from 'react-icons/md';

import {
  IconButton,
  Tooltip,
} from '@mui/material';

import Button from '../Button';

import NotAvailable from '../../assets/imagenotavailable.png';

import styles from './card.module.css';

function Card({
  image,
  title,
  id,
}) {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      {image ? (
        <img
          src={image}
          alt={title}
          className={styles.image}
        />
      )
        : (
          <img
            src={NotAvailable}
            alt={title}
            height={200}
            width={240}
            style={{
              objectFit: 'cover',
            }}
          />
        )}
      <p style={{
        textTransform: 'uppercase',
        color: '#2B2D42',
      }}
      >
        {title}
      </p>
      <div className={styles.container__bottom}>
        <Tooltip title="Favorite">
          <IconButton aria-label="Favorite" onClick={() => console.info('favorite called...')}>
            <MdFavorite color="#2B2D42" />
          </IconButton>
        </Tooltip>
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
