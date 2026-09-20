import axios from 'axios';

const API_KEY = '57655866-60005b456cabde49bcceaed9d';

export default function getImagesByQuery(query) {
  return axios
    .get('https://pixabay.com/api/', {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log('Sorry, there has been an error');
      throw error;
    });
}
