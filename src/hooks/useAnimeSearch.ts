import { useState, useEffect } from 'react';
import { searchAnime, getTopAnime } from '../services/api';
import { debounce } from 'lodash';
import { Anime } from '../types/anime';

interface UseAnimeSearchProps {
    query: string;
    page: number;
}

interface AnimeSearchState {
    results: Anime[];
    loading: boolean;
    error: string | null;
    lastPage: number;
    noResults: boolean;
}

export const useAnimeSearch = ({ query, page }: UseAnimeSearchProps): AnimeSearchState => {
    const [results, setResults] = useState<Anime[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [lastPage, setLastPage] = useState(1);
    const [noResults, setNoResults] = useState(false);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const fetchAnime = async () => {
            setLoading(true);
            setError(null);
            setNoResults(false);

            try {
                const response = query.trim()
                    ? await searchAnime(query, page, signal)
                    : await getTopAnime(page, signal);

                const data = response.data;
                setResults(data.data);
                setLastPage(data.pagination.last_visible_page);
                setNoResults(query.trim() !== '' && data.data.length === 0);
            } catch (err: any) {
                if (err.name !== 'CanceledError') {
                    setError('Failed to fetch anime.');
                    setResults([]);
                }
            } finally {
                setLoading(false);
            }
        };

        const debouncedFetch = debounce(fetchAnime, 250);
        debouncedFetch();

        return () => {
            controller.abort();
            debouncedFetch.cancel();
        };
    }, [query, page]);

    return { results, loading, error, lastPage, noResults };
};
