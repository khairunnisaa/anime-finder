import React, { useState, useEffect, useCallback } from 'react';
import {
    Pagination,
    Container,
    Box,
    Snackbar,
    Alert
} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { useAnimeSearch } from '../hooks/useAnimeSearch';
import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar';
import NoResultsBox from '../components/NoResultBox';
import AnimeSkeletonGrid from '../components/SkeletonGrid';
import SearchResultsGrid from '../components/SearchResultGrid';

const SearchPage: React.FC = () => {
    const [inputQuery, setInputQuery] = useState('');
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const [recentSearches, setRecentSearches] = useState<string[]>([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const navigate = useNavigate();

    const { results, loading, error, lastPage, noResults } = useAnimeSearch({ query, page });

    const handleSearchSubmit = useCallback((): void => {
        const trimmed = inputQuery.trim();
        if (!trimmed) return;

        setQuery(trimmed);
        setPage(1);

        const newRecent = [
            trimmed,
            ...recentSearches.filter(q => q.toLowerCase() !== trimmed.toLowerCase())
        ].slice(0, 5);

        setRecentSearches(newRecent);
        localStorage.setItem('recentSearches', JSON.stringify(newRecent));
    }, [inputQuery, recentSearches]);

    const handleReset = useCallback((): void => {
        setInputQuery('');
        setQuery('');
        setPage(1);
    }, []);

    useEffect(() => {
        const stored = localStorage.getItem('recentSearches');
        if (stored) {
            setRecentSearches(JSON.parse(stored));
        }
    }, []);

    useEffect(() => {
        if (error || noResults) {
            setSnackbarOpen(true);
        }
    }, [error, noResults]);

    const errorMessage = error || (noResults ? `No results found for "${query}"` : '');

    return (
        <Container sx={{ mt: 4 }}>
            <Box mb={4}>
                <Hero />
            </Box>

            <SearchBar
                inputQuery={inputQuery}
                setInputQuery={setInputQuery}
                onSubmit={handleSearchSubmit}
                onReset={handleReset}
                recentSearches={recentSearches}
                onSelectRecent={(search) => {
                    setInputQuery(search);
                    setQuery(search);
                    setPage(1);
                }}
                loading={loading}
            />

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert severity={error ? 'error' : 'info'} onClose={() => setSnackbarOpen(false)} sx={{ width: '100%' }}>
                    {errorMessage}
                </Alert>
            </Snackbar>

            {noResults && <NoResultsBox message={errorMessage} />}

            {loading && <AnimeSkeletonGrid />}

            {!loading && results.length > 0 && (
                <SearchResultsGrid results={results} onAnimeClick={(id) => navigate(`/anime/${id}`)} />
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
