
import React from 'react';
import { Grid } from '@mui/material';
import AnimeCard from './AnimeCard';

interface Anime {
    mal_id: number;
    title: string;
    images: {
        jpg: {
            image_url: string;
        };
    };
}

interface SearchResultsGridProps {
    results: Anime[];
    onAnimeClick: (id: number) => void;
}

const SearchResultsGrid: React.FC<SearchResultsGridProps> = ({ results, onAnimeClick }) => {
    return (
        <Grid container spacing={2} sx={{ mt: 2, maxHeight: '70vh', overflowY: 'auto', border: '1px solid #ccc', borderRadius: 1, p: 1 }}>
            {results.map((anime) => (
                <Grid size={{xs:12, sm:6, md:3}} key={anime.mal_id}>
                    <AnimeCard anime={anime} onClick={() => onAnimeClick(anime.mal_id)} />
                </Grid>
            ))}
        </Grid>
    );
};

export default SearchResultsGrid;
