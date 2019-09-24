import axios from 'axios';
import { UNSPLASH_API_KEY } from './constants';
import { IPhoto } from './interfaces/IPhoto';

const search = async (query: string): Promise<IPhoto[]> => {
    const API_URL: string = 'https://api.unsplash.com';
    try {
        const res = await axios.get(
            `${API_URL}/search/photos?query=${query}&client_id=${UNSPLASH_API_KEY}`,
        );
        return res.data.results;
    } catch (error) {
        throw Error('An error occurred: \r' + error);
    }
};

export default search;
