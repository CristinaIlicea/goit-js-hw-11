import { fetchPics } from './fetchPics.js';
import Notiflix from 'notiflix';

let searchQuery = '';
export let currentSearchQuery = '';

export const searchForm = document.querySelector('.search-form');

searchForm.addEventListener('submit', async e => {
    e.preventDefault();
    const userSearchQuery = e.currentTarget.elements.searchQuery.value.trim();
  
    if (!userSearchQuery) {
      Notiflix.Notify.failure('Please enter a search term.');
      return;
    }
  
    currentSearchQuery = userSearchQuery;
  
    try {
      const imageData = await fetchPics(currentSearchQuery);
  
      console.log('Datele primite după căutare:', imageData);
  
      if (!imageData || imageData.results.length === 0) {
        Notiflix.Notify.failure(
          `Sorry, we couldn't find any images matching "${currentSearchQuery}". Please try a different search term.`
        );
        return;
      } else {
        Notiflix.Notify.success(
          `We found ${imageData.total_results} images matching "${currentSearchQuery}".`
        );
      }
      
      options.totalItems = imageData.total_pages;
      createPagination(options.totalItems);
  
      createFilmCard(imageData);
  
      searchForm.elements.searchQuery.value = '';
    } catch (error) {
      console.error(
        'Search result is not successful. Enter the correct image name and press enter',
        error
      );
    }
  });
  