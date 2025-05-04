import React, { useMemo, useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { getTheme } from './theme';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


const Root = () => {
    const [mode, setMode] = useState<'light' | 'dark'>('light');
    const theme = useMemo(() => getTheme(mode), [mode]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <App toggleTheme={() => setMode(prev => (prev === 'light' ? 'dark' : 'light'))} />
        </ThemeProvider>
    );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<Root />);
