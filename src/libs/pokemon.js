import api from './api';

async function getAllPokemons(filters) {
  try {
    const response = await api.get('/pokemon/getallpokemons', {
      params: filters,
    });

    if (response && response.data) {
      return response.data;
    }
  } catch (e) {
    throw new Error('Error getAllPokemons', e);
  }
  return null;
}

async function getById(id) {
  try {
    const response = await api.get('/pokemon/getbyid', {
      params: {
        id,
      },
    });
    if (response && response.data) {
      return response.data;
    }
  } catch (e) {
    throw new Error('Error getById', e);
  }
  return null;
}

async function getByUserId(userId) {
  try {
    const response = await api.get('/pokemon/getbyuserid', {
      params: {
        userId,
      },
    });
    if (response && response.data) {
      return response.data;
    }
  } catch (e) {
    throw new Error('Error getByUserId', e);
  }
  return null;
}

async function deletePokemon(id) {
  try {
    const response = await api.delete('/pokemon/delete', {
      data: {
        id,
      },
    });
    if (response && response.data) {
      return response.data;
    }
  } catch (e) {
    throw new Error('Error deletePokemon', e);
  }
  return null;
}

async function getRandomImage() {
  try {
    const response = await api.get('/pokemon/getimage');
    if (response && response.data) {
      return response.data;
    }
  } catch (e) {
    throw new Error('Error getRandomImage', e);
  }
  return null;
}

async function createPokemon(data) {
  try {
    const response = await api.post('/pokemon/create', data);
    if (response && response.data) {
      return response.data;
    }
  } catch (e) {
    throw new Error('Error createPokemon', e);
  }
  return null;
}

export {
  getAllPokemons,
  getRandomImage,
  createPokemon,
  getById,
  getByUserId,
  deletePokemon,
};
