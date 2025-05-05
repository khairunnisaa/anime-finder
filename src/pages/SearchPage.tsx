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
    const [inputQuery, setInputQuery] = useState('');
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const [recentSearches, setRecentSearches] = useState<string[]>([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const navigate = useNavigate();

    const { results, loading, error, lastPage, noResults } = useAnimeSearch({ query, page });

    const handleSearchSubmit = () => {
        const trimmed = inputQuery.trim();
        if (!trimmed) return;

        setQuery(trimmed);
        setPage(1);

        const newRecent = [trimmed, ...recentSearches.filter(q => q !== trimmed)].slice(0, 5);
        setRecentSearches(newRecent);
        localStorage.setItem('recentSearches', JSON.stringify(newRecent));
    };

    const handleReset = () => {
        setInputQuery('');
        setQuery('');
        setPage(1);
    };

    // Load recent searches from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem('recentSearches');
        if (stored) {
            setRecentSearches(JSON.parse(stored));
        }

        if (error || noResults) {
            setSnackbarOpen(true);
        }
    }, [error, noResults]);

    const renderSkeletons = () => (
        <Grid container spacing={2} sx={{ mt: 2 }}>
            {Array.from({ length: 6 }).map((_, index) => (
                <Grid key={index} size={{xs:12, sm:6, md:4}}>
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
                border={1}
                borderRadius={3}
                borderColor={'cornflowerblue'}
                bgcolor={'white'}
                sx={{
                    position: 'sticky',
                    top: 10,
                    zIndex: 10,
                    py: 1,
                    px: 2,
                }}
            >
                <Typography variant="subtitle1">Search :</Typography>
                <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                <TextField
                    fullWidth
                    placeholder="Search anime..."
                    value={inputQuery}
                    onChange={(e) => setInputQuery(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSearchSubmit();
                        }
                    }}
                    variant="outlined"
                />

                    <Button
                        variant="contained"
                        onClick={handleSearchSubmit}
                    >Search
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleReset}
                    >
                        Reset
                    </Button>
                </Box>

                {recentSearches.length > 0 && (
                    <Box mt={2}>
                        <Typography variant="subtitle1">Recent Searches:</Typography>
                        <Box display="flex" gap={1} flexWrap="wrap">
                            {recentSearches.map((search, index) => (
                                <Button
                                    key={index}
                                    size="small"
                                    variant="outlined"
                                    onClick={() => {
                                        setInputQuery(search);
                                        setQuery(search);
                                        setPage(1);
                                    }}
                                >
                                    {search}
                                </Button>
                            ))}
                        </Box>
                    </Box>
                )}
            </Box>



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

            {noResults && (
                <Box mt={2} border={1} borderColor={'red'} bgcolor={'red'} borderRadius={3} p={2}>
                    <Typography color={'white'} textAlign={'center'}>
                        {error || (noResults && `No results found for anime title "${query}"`)}
                    </Typography>
                </Box>
            )}


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
                    <Grid container spacing={2}>
                        {results.map((anime) => (
                            <Grid size={{xs:12, sm:6, md:3}} key={anime.mal_id}>
                                <AnimeCard anime={anime} onClick={() => navigate(`/anime/${anime.mal_id}`)} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            )}

            {results.length > 0 && (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        mt: 4,
                        bgcolor: 'aliceblue',
                        opacity: '0.9',
                        py: 1,
                        px: 2,
                        borderTop: '1px solid',
                        borderColor: 'divider',
                    }}
                >
                    <Pagination
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
