import axios from 'axios';

const BASE_URL = 'https://api.jikan.moe/v4';
const instance = axios.create({ baseURL: BASE_URL });

export const getTopAnime = (page = 1, signal?: AbortSignal) =>
    instance.get('/top/anime', {
        params: { page },
        signal,
    });

export const searchAnime = (query: string, page: number, cancelToken: AbortSignal) =>
    instance.get('/anime', {
        params: { q: query, page },
        signal: cancelToken,
    });

export const getAnimeDetails = (id: string, signal?: AbortSignal) => {
    return instance.get(`/anime/${id}`, { signal });
};
