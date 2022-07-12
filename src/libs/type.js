import api from './api';

async function getTypes() {
  try {
    const response = await api.get('/type/getalltypes');
    if (response && response.data) {
      return response.data;
    }
  } catch (e) {
    console.info('Error', e);
  }
  return null;
}

export {
  getTypes,
};
