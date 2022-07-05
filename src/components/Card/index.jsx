import React, {
  useContext,
} from 'react';

import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Tooltip,
  IconButton,
  Typography,
} from '@mui/material';

import axios from 'axios';

import {
  Favorite,
} from '@mui/icons-material';

import {
  API_URL,
} from '../../utils/constants';

import AuthContext from '../../context/authContext';

function CardComponent({
  image,
  title,
  about,
  malId,
}) {
  const {
    userData,
  } = useContext(AuthContext);

  async function addToFavorites(id) {
    try {
      await axios.post(`${API_URL}/favorites/add`, {
        userId: userData._id,
        malId: id,
      });
    } catch (e) {
      console.info('Error: ', e);
    }
  }

  return (
    <Card sx={{
      width: 345,
      height: 500,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}
    >
      <CardMedia
        component="img"
        height="200"
        image={image}
        alt={title}
        sx={{
          objectFit: 'contain',
          height: '45%',
        }}
      />
      <CardContent
        sx={{
          height: '45%',
        }}
      >
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {(about || '').split(' ')
            .filter((item, index) => index <= 30)
            .join(' ')}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          height: '10%',
        }}
      >
        <Tooltip title="Add To Favorites">
          <IconButton aria-label="Add To Favorites" onClick={() => addToFavorites(malId)}>
            <Favorite />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}

export default CardComponent;
