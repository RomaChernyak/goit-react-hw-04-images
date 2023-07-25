const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '7318684-c1f4ba06db87b87444b263aa7';
const Per_Page = 12;

export function fetchGalleryImg(searchQuery, page) {
    return fetch(
        `${BASE_URL}?q=${searchQuery}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${Per_Page}&page=${page}`
    ).then(response => {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(new Error(response.status));
    });
}