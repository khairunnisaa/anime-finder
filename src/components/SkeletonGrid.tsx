// components/AnimeSkeletonGrid.tsx
import React from 'react';
import { Grid, Box, Skeleton } from '@mui/material';

const AnimeSkeletonGrid: React.FC = () => {
    return (
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
};

export default AnimeSkeletonGrid;
