import React from 'react';

import {
  useNavigate,
} from 'react-router-dom';

import {
  Favorite,
} from '@mui/icons-material';

import {
  IconButton,
  Tooltip,
} from '@mui/material';

import NotAvailable from '../../assets/imagenotavailable.png';

import Button from '../Button';

function Card({
  image,
  title,
  id,
}) {
  const navigate = useNavigate();
  return (
    <div style={{
      height: '300px',
      width: '240px',
      backgroundColor: '#EFF6EE',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      border: '4px solid #F02D3A',
      borderRadius: '10px',
    }}
    >
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
            src={NotAvailable}
            alt={title}
            height={200}
            width={240}
            style={{ objectFit: 'cover' }}
          />
        )}
      <p style={{
        textTransform: 'capitalize',
      }}
      >
        {title}
      </p>
      <div style={{
        display: 'flex',
        alignItems: 'center',
      }}
      >
        <Tooltip title="Favorite">
          <IconButton aria-label="Favorite" onClick={() => console.info('favorite called...')}>
            <Favorite
              fontSize="large"
              sx={{
                color: '#F02D3A',
              }}
            />
          </IconButton>
        </Tooltip>
        <Button onClick={() => navigate(`/pokemon/${id}`)}>
          More Details
        </Button>
      </div>
    </div>
  );
}

export default Card;
