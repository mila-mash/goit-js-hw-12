import axios from 'axios';

const API_KEY = '57655866-60005b456cabde49bcceaed9d';

export default async function getImagesByQuery(query, page) {
  try {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: 15,
      },
    });
    return response.data;
  } catch (error) {
    console.log('Sorry, there has been an error');
    throw error;
  }
}
