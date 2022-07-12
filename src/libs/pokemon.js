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
    console.info('Error', e);
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
    console.info('Error', e);
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
    console.info('Error', e);
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
    console.info('Error', e);
  }
  return null;
}

export {
  getAllPokemons,
  getRandomImage,
  createPokemon,
  getById,
};