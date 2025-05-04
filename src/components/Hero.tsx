import React, { useEffect, useState } from 'react';
import {Box, Typography, Button, Skeleton, Fade} from '@mui/material';
import { getTopAnime } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface Anime {
    mal_id: number;
    title: string;
    images: { jpg: { image_url: string } };
    synopsis: string;
}

const Hero: React.FC = () => {
    const [animeList, setAnimeList] = useState<Anime[]>([]);
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTop = async () => {
            try {
                const res = await getTopAnime(1);
                setAnimeList(res.data.data.slice(0, 5));
                setError(null);
            } catch (e) {
                setError('Failed to load top anime. Please check your connection.');
            } finally {
                setLoading(false);
            }
        };
        fetchTop();
    }, []);

    if (error) {
        return (
            <Box sx={{ p: 2, textAlign: 'center', color: 'error.main' }}>
                <Typography variant="h6">{error}</Typography>
            </Box>
        );
    }

    const renderSkeletons = () => (
        <Box sx={{ display: 'flex', gap: 2, p: 2 }}>
            {[1, 2, 3, 4, 5].map((id) => (
                <Box key={id} sx={{ width: 250 }}>
                    <Skeleton variant="rectangular" height={140} />
                    <Skeleton variant="text" />
                    <Skeleton variant="text" width="80%" />
                </Box>
            ))}
        </Box>
    );

    if (loading) return renderSkeletons();

    return (
        <Fade in={!loading}>
            <Box sx={{ width: '100%', mb: 4 }}>
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 4000 }}
                    loop
                    style={{ width: '100%', height: '300px' }}
                >
                    {animeList.map((anime) => (
                        <SwiperSlide key={anime.mal_id}>
                            <Box
                                sx={{
                                    position: 'relative',
                                    width: '100%',
                                    height: '100%',
                                    backgroundImage: `url(${anime.images.jpg.image_url})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    color: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    px: 4,
                                    py: 2,
                                    backdropFilter: 'blur(3px)',
                                }}
                            >
                                <Box
                                    sx={{
                                        backgroundColor: 'rgba(0,0,0,0.6)',
                                        p: 3,
                                        borderRadius: 2,
                                        maxWidth: '600px',
                                    }}
                                >
                                    <Typography variant="h5" gutterBottom>
                                        {anime.title}
                                    </Typography>
                                    <Typography variant="body2" sx={{ mb: 2 }}>
                                        {anime.synopsis?.slice(0, 200)}...
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        onClick={() => navigate(`/anime/${anime.mal_id}`)}
                                    >
                                        View Details
                                    </Button>
                                </Box>
                            </Box>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Box>
        </Fade>

    );
};

export default Hero;
