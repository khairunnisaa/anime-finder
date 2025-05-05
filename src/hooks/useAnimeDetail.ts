import { useEffect, useState } from 'react';
import { getAnimeDetails } from '../services/api';
import { Anime } from '../types/anime';

export const useAnimeDetail = (id?: string) => {
    const [anime, setAnime] = useState<Anime | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) {
            setError('Invalid anime ID');
            setLoading(false);
            return;
        }

        const controller = new AbortController();
        const fetchAnime = async () => {
            setLoading(true);
            try {
                const res = await getAnimeDetails(id, controller.signal);
                setAnime(res.data.data);
                setError(null);
            } catch (err: any) {
                if (err.name !== 'CanceledError') {
                    console.error('Error fetching anime detail:', err);
                    setError('Failed to fetch anime details.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchAnime();

        return () => controller.abort();
    }, [id]);

    return { anime, loading, error };
};
