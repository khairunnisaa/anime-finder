import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {AppBar, Toolbar, Typography, IconButton, Box} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import SearchPage from './pages/SearchPage';
import AnimeDetailPage from './pages/AnimeDetailPage';
import Footer from "./components/Footer";

const App: React.FC<{ toggleTheme: () => void }> = ({ toggleTheme }) => {
    return (
        <Router>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}>
                        Anime Finder
                    </Typography>
                    <IconButton color="inherit" onClick={toggleTheme}>
                        <Brightness4Icon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Box sx={{ minHeight: 'calc(100vh - 64px - 56px)' }}>
                <Routes>
                    <Route path="/" element={<SearchPage />} />
                    <Route path="/anime/:id" element={<AnimeDetailPage />} />
                </Routes>
            </Box>
            <Footer/>
        </Router>
    );
};

export default App;
