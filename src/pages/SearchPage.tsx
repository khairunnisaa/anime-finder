import React, { useEffect, useState } from 'react';
import {
    TextField,
    Grid,
    Pagination,
    Container,
    Box,
    Typography,
    Skeleton,
    Button,
    Snackbar,
    Alert, CardContent
} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import {getTopAnime, searchAnime} from '../services/api';
import AnimeCard from '../components/AnimeCard';
import {Anime} from "../types/anime";
import Hero from "../components/Hero";

const SearchPage: React.FC = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Anime[]>([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [recentSearches, setRecentSearches] = useState<string[]>([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');


    useEffect(() => {
        const controller = new AbortController();
        const saved = localStorage.getItem('recentSearches');
        if (saved) {
            setRecentSearches(JSON.parse(saved));
        }


        const delayDebounce = setTimeout(() => {
            if (query.trim()) {
                fetchResults(controller.signal);
            } else {
                fetchTopAnime(controller.signal);
            }
        }, 250);

        return () => {
            controller.abort();
            clearTimeout(delayDebounce);
        };
    },[query, page]);

    const fetchTopAnime = async (signal: AbortSignal) => {
        setLoading(true);
        try {
            const res = await getTopAnime(page, signal);
            setResults(res.data.data);
            setLastPage(res.data.pagination.last_visible_page);
            setError(null);

        } catch (err: any) {
            if (err.name !== 'CanceledError') {
                setError('Failed to fetch top anime.');
                setSnackbarMessage('Failed to fetch top anime.');
                setSnackbarOpen(true);
            }
        } finally {
            setLoading(false);
        }
    };

    const saveRecentSearch = (term: string) => {
        setRecentSearches((prev) => {
            const newSearches = [term, ...prev.filter(t => t !== term)].slice(0, 5);
            localStorage.setItem('recentSearches', JSON.stringify(newSearches));
            return newSearches;
        });
    };

    const fetchResults = async (signal: AbortSignal) => {
        setLoading(true);
        try {
            const res = await searchAnime(query, page, signal);
            setResults(res.data.data);
            setLastPage(res.data.pagination.last_visible_page);
            setError(null);
            saveRecentSearch(query);
            if (res.data.data.length === 0) {
                setSnackbarMessage('No results found.');
                setSnackbarOpen(true);
            }
        } catch (err: any) {
            if (err.name !== 'CanceledError') {
                console.error('Error fetching anime:', err);
                setError('Failed to fetch anime. Try again later.');
                setSnackbarMessage('Failed to fetch anime. Please try again.');
                setSnackbarOpen(true);
            }


        } finally {
            setLoading(false);
        }
    };

    const renderSkeletons = () => (
        <Grid container spacing={2} sx={{ mt: 2 }}>
            {Array.from({ length: 6 }).map((_, index) => (
                <Grid size={{xs: 12, sm: 6, md: 4}} key={index}>
                    <Box sx={{ width: '100%' }}>
                        <Skeleton variant="rectangular" width="100%" height={300} />
                        <Skeleton variant="text" sx={{ mt: 1 }} />
                        <Skeleton variant="text" width="60%" />
                    </Box>
                </Grid>
            ))}
        </Grid>
    );


    return (

        <Container sx={{ mt: 4 }}>
            <Hero/>
            <Box
                sx={{
                    position: 'sticky',
                    top: 10, // Adjust if your AppBar height is different
                    zIndex: 10,
                    bgcolor: 'aliceblue',
                    opacity: '0.9',
                    py: 1,
                    px: 2,
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                }}
            >
                <Typography variant={'h5'}>Search</Typography>
                <TextField
                    fullWidth
                    placeholder="Search anime..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    variant="outlined"
                    size="medium"
                />
            </Box>

            {recentSearches.length > 0 && (
                <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2">Recent Searches:</Typography>
                    {recentSearches.map((term) => (
                        <Button
                            key={term}
                            variant="outlined"
                            size="small"
                            sx={{ m: 0.5 }}
                            onClick={() => setQuery(term)}
                        >
                            {term}
                        </Button>
                    ))}
                </Box>
            )}

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center', }}
            >
                <Alert severity="error" onClose={() => setSnackbarOpen(false)} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>


            {loading && renderSkeletons()}


            {error && (
                <Typography color="error" sx={{ mt: 2 }}>
                    {error}
                </Typography>
            )}

            {!loading && results.length === 0 && query.trim() !== '' && !error && (
                <Box bgcolor={'red'} sx={{color:'warning', mt:4}}>
                    <Typography color={'white'} sx={{ p:2}}>
                        Sorry, No results found for "<strong>{query}</strong>"
                    </Typography>
                </Box>

            )}


            {!loading && results.length > 0 && (
                <Box
                    sx={{
                        mt: 2,
                        maxHeight: '70vh',
                        overflowY: 'auto',
                        border: '1px solid #ccc',
                        borderRadius: 1,
                        p: 1,
                    }}
                >
                <Grid container spacing={2} sx={{ mt: 2 }}>
                    {results.map((anime) => (
                        <Grid size={{xs: 12, sm: 6, md: 3}} key={anime.mal_id}>
                            <AnimeCard anime={anime} onClick={() => navigate(`/anime/${anime.mal_id}`)} />
                        </Grid>
                    ))}
                </Grid>
                </Box>
            )}

            {results.length > 0 && (

                <Box
                    justifyItems={'right'}
                    sx={{
                        position: 'sticky',
                        top: 10, // Adjust if your AppBar height is different
                        zIndex: 10,
                        bgcolor: 'aliceblue',
                        opacity: '0.9',
                        py: 1,
                        px: 2,
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                    }}
                >
                    <Pagination
                        sx={{ mt: 4 }}
                        count={lastPage}
                        page={page}
                        onChange={(_, value) => setPage(value)}
                        color="primary"
                    />
                </Box>


            )}
        </Container>
    );
};

export default SearchPage;
