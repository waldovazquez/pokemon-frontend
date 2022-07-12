import api from './api';

async function getByToken(token) {
  try {
    const response = await api.get('/user/getbytoken', {
      params: {
        token,
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

async function login(data) {
  try {
    const response = await api.post('/user/login', data);
    if (response && response.data) {
      return response.data;
    }
  } catch (e) {
    console.info('Error', e);
  }
  return null;
}

async function register(data) {
  try {
    const response = await api.post('user/register', data);
    if (response && response.data) {
      return response.data;
    }
  } catch (e) {
    console.info('Error', e);
  }
  return null;
}

export {
  getByToken,
  login,
  register,
};
