import api from './api';

async function getTypes() {
  try {
    const response = await api.get('/type/getalltypes');
    if (response && response.data) {
      return response.data;
    }
  } catch (e) {
    throw new Error('Error getTypes', e);
  }
  return null;
}

export default getTypes;
