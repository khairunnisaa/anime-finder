// components/search/NoResultsBox.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';

interface NoResultsBoxProps {
    message: string;
}

const NoResultsBox: React.FC<NoResultsBoxProps> = ({ message }) => {
    return (
        <Box
            sx={{
                mt: 2,
                minHeight: '70vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #ccc',
                borderRadius: 1,
                bgcolor: 'red',
                p: 3,
            }}
        >
            <Typography color="white" align="center">
                {message}
            </Typography>
        </Box>
    );
};

export default NoResultsBox;
