import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '7318684-c1f4ba06db87b87444b263aa7';

export const fetchImages = async (value, page) => {
    const params = new URLSearchParams({
        q: value,
        page: page,
        key: API_KEY,
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: '12',
    });
    
    const response = await axios.get(`${BASE_URL}?${params}`);

    return response.data;
};