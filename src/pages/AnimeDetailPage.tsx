import React from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {
    Container,
    Typography,
    CardMedia,
    CardContent,
    Button,
    Card,
    Skeleton,
    Grid,
    Box,
    Divider,
} from '@mui/material';
import { useAnimeDetail } from '../hooks/useAnimeDetail';

const AnimeDetailPage: React.FC = () => {
    const { id } = useParams();
    const { anime, loading, error } = useAnimeDetail(id);
    const navigate = useNavigate();

    const renderSkeleton = () => (
        <Grid container spacing={4}>
            <Grid size={{xs:12, sm:4}}>
                <Skeleton variant="rectangular" width="100%" height={300} />
            </Grid>
            <Grid size={{xs:12, sm:8}}>
                <Typography variant="h4">
                    <Skeleton width="60%" />
                </Typography>
                <Skeleton width="80%" />
                <Skeleton width="90%" />
                <Skeleton width="95%" />
                <Skeleton width="70%" />
            </Grid>
        </Grid>
    );

    if (loading) return renderSkeleton();

    if (error) return <Typography sx={{ mt: 4 }} color="error">{error}</Typography>;

    if (!anime) return <Typography sx={{ mt: 4 }}>Anime not found.</Typography>;

    return (
        <Container sx={{ mt: 4 }}>

            <Card sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <CardMedia
                    component="img"
                    alt={anime.images.jpg.image_url}
                    height="250"
                    image={anime.images.jpg.image_url}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {anime.title}
                    </Typography>
                    <Divider />
                    <Typography variant="body1" textAlign={'justify'} sx={{ mt: 2 }}>
                        {anime.synopsis || 'No synopsis available.'}
                    </Typography>
                    <Grid size={{xs:12, sm:8}}>
                        <Typography variant="h6" gutterBottom>
                            Stats
                        </Typography>
                        <Divider />
                        <Box mt={2} sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                            <Box width={'150px'} sx={{ backgroundColor: 'greenyellow', p: 2, borderRadius: 2, boxShadow: 1 }}>
                                <Typography variant="body1"><strong>Score:</strong> {anime.score ?? 'N/A'} / 10</Typography>
                            </Box>
                            <Box width={'150px'} sx={{ backgroundColor: 'orange', p: 2, borderRadius: 2, boxShadow: 1 }}>
                                <Typography variant="body1"><strong>Rated By:</strong> {anime.scored_by?.toLocaleString() ?? 'N/A'} users</Typography>
                            </Box>
                            <Box width={'150px'} sx={{ backgroundColor: 'aliceblue', p: 2, borderRadius: 2, boxShadow: 1 }}>
                                <Typography variant="body1"><strong>Popularity Rank:</strong> #{anime.popularity ?? 'N/A'}</Typography>
                            </Box>
                            <Box width={'150px'} sx={{ backgroundColor: 'cornsilk', p: 2, borderRadius: 2, boxShadow: 1 }}>
                                <Typography variant="body1"><strong>Members:</strong> {anime.members?.toLocaleString() ?? 'N/A'}</Typography>
                            </Box>
                            <Box width={'150px'} sx={{ backgroundColor: 'cornflowerblue', p: 2, borderRadius: 2, boxShadow: 1 }}>
                                <Typography variant="body1"><strong>Rating:</strong> {anime.rating ?? 'N/A'}</Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Box mt={2}>
                        <Button variant="contained" href="/" onClick={() => navigate('')}>Back</Button>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
};

export default AnimeDetailPage;
