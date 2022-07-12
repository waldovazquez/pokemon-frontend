import api from './api';

async function createFavorite(data) {
  try {
    const response = await api.post('/favorites/create', data);
    if (response && response.data) {
      return response.data;
    }
  } catch (e) {
    throw new Error('Error createFavorite', e);
  }
  return null;
}

async function getFavorites(filters) {
  try {
    const response = await api.get('/favorites/getallfavorites', {
      params: {
        page: filters.page,
        userId: filters.userId,
      },
    });
    if (response && response.data) {
      return response.data;
    }
  } catch (e) {
    throw new Error('Error getFavorites', e);
  }
  return null;
}

async function deleteFavorite(id) {
  try {
    const response = await api.delete('/favorites/delete', {
      data: {
        id,
      },
    });
    if (response && response.data) {
      return response.data;
    }
  } catch (e) {
    throw new Error('Error deleteFavorite', e);
  }
  return null;
}

export {
  createFavorite,
  getFavorites,
  deleteFavorite,
};
