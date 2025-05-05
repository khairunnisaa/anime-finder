// components/search/SearchBar.tsx
import React from 'react';
import {
    Box,
    TextField,
    Button,
    Typography
} from '@mui/material';

interface SearchBarProps {
    inputQuery: string;
    setInputQuery: (value: string) => void;
    onSubmit: () => void;
    onReset: () => void;
    recentSearches: string[];
    onSelectRecent: (value: string) => void;
    loading?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
                                                 inputQuery,
                                                 setInputQuery,
                                                 onSubmit,
                                                 onReset,
                                                 recentSearches,
                                                 onSelectRecent,
                                                 loading
                                             }) => {
    return (
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
                            onSubmit();
                        }
                    }}
                    disabled={loading}
                    variant="outlined"
                />

                <Button variant="contained" onClick={onSubmit} disabled={loading}>Search</Button>
                <Button variant="outlined" color="secondary" onClick={onReset} disabled={loading}>Reset</Button>
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
                                onClick={() => onSelectRecent(search)}
                            >
                                {search}
                            </Button>
                        ))}
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default SearchBar;
