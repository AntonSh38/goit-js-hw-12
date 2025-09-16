import axios from 'axios';

export async function getImagesByQuery(query, page = 1) {
  const BASE_URL = 'https://pixabay.com';
  const API_KEY = '52236673-dfbbe0e7dd19cbeb92e7645c8';
  const END_POINT = '/api/';
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: page,
    per_page: 15,
  };

  try {
    const res = await axios.get(`${BASE_URL}${END_POINT}`, { params });

    if (!res.data || typeof res.data !== 'object') {
      throw new Error('Invalid response structure');
    }

    return res.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}
