import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer: React.FC = () => {
    return (
        <Box
            component="footer"
            sx={{
                mt: 4,
                py: 2,
                px: 2,
                textAlign: 'center',
                bgcolor: 'background.paper',
                borderTop: '1px solid',
                borderColor: 'divider',
            }}
        >
            <Typography variant="body2" color="text.secondary">
                © {new Date().getFullYear()} Anime Finder • Powered by Jikan API
            </Typography>
        </Box>
    );
};

export default Footer;
