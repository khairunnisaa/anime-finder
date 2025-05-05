import React, { useState, useEffect } from 'react';
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
    Alert,
} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { useAnimeSearch } from '../hooks/useAnimeSearch';
import AnimeCard from '../components/AnimeCard';
import Hero from '../components/Hero';

const SearchPage: React.FC = () => {
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const [recentSearches, setRecentSearches] = useState<string[]>([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const navigate = useNavigate();

    const { results, loading, error, lastPage, noResults } = useAnimeSearch({ query, page });

    // Load recent searches
    useEffect(() => {
        const saved = localStorage.getItem('recentSearches');
        if (saved) setRecentSearches(JSON.parse(saved));
    }, []);

    // Save to recent
    useEffect(() => {
        if (query.trim()) {
            setRecentSearches((prev) => {
                const newSearches = [query, ...prev.filter(t => t !== query)].slice(0, 5);
                localStorage.setItem('recentSearches', JSON.stringify(newSearches));
                return newSearches;
            });
        }
    }, [query]);

    useEffect(() => {
        if (error || noResults) {
            setSnackbarOpen(true);
        }
    }, [error, noResults]);

    const renderSkeletons = () => (
        <Grid container spacing={2} sx={{ mt: 2 }}>
            {Array.from({ length: 6 }).map((_, index) => (
                <Grid size={{xs:12, sm:6, md:4}} key={index}>
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
            <Hero />

            <Box
                sx={{
                    position: 'sticky',
                    top: 10,
                    zIndex: 10,
                    bgcolor: 'aliceblue',
                    opacity: '0.9',
                    py: 1,
                    px: 2,
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                }}
            >
                <Typography variant="h5">Search</Typography>
                <TextField
                    fullWidth
                    placeholder="Search anime..."
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setPage(1);
                    }}
                    variant="outlined"
                    size="medium"
                />
            </Box>

            {recentSearches.length > 0 && (
                <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2">Recent Searches:</Typography>
                    {recentSearches.map((term) => (
                        <Button key={term} variant="outlined" size="small" sx={{ m: 0.5 }} onClick={() => setQuery(term)}>
                            {term}
                        </Button>
                    ))}
                </Box>
            )}

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert severity={error ? 'error' : 'info'} onClose={() => setSnackbarOpen(false)} sx={{ width: '100%' }}>
                    {error || (noResults && `No results found for "${query}"`)}
                </Alert>
            </Snackbar>

            {loading && renderSkeletons()}

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
                            <Grid size={{xs:12, sm:6, md:3 }} key={anime.mal_id}>
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
                        top: 10,
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
