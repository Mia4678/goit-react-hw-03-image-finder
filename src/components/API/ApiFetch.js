// Your API key: '38757222-aac38a2f2dda445319a4579ec'

import axios from 'axios';

const API_KEY = '38752753-3e559f3e5f741918923bcfb47';
const BASE_URL = 'https://pixabay.com/api/';
// const ITEMS_PER_PAGE = 12;

export const fetchImages = async (query, page = 1) => {
  return axios
    .get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 12,
        page,
      },
    })
    .then(response => response.data.hits)
    .catch(error => {
      throw error;
    });
};
