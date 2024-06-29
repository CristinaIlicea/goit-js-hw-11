import axios from 'axios';
import Notiflix from 'notiflix';

export const API_KEY = '44532469-cc19b20a07107ce5ad0c127f1';
export const BASE_URL = `https://pixabay.com/api/`;


export async function fetchPics(searchQuery = '', page = 1) {
  let url = '';
  if (searchQuery) {
    url = `${BASE_URL}/?api_key=${API_KEY}&=${encodeURIComponent(
      searchQuery
    )}&page=${page}`;
  } else {
    url = `${BASE_URL}/trending/all/day?language=en-US&api_key=${API_KEY}&page=${page}`;
  }

  try {
    const response = await axios.get(url);
    return { ...response.data };
  } catch (error) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    throw error;
  }
}
