import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAnimeDetails } from '../services/api';
import {
    Container,
    Typography,
    CircularProgress,
    CardMedia,
    CardContent,
    CardActions,
    Button,
    Card, Skeleton, Grid, Box
} from '@mui/material';

const AnimeDetailPage: React.FC = () => {
    const { id } = useParams();
    const [anime, setAnime] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnime = async () => {
            try {
                const res = await getAnimeDetails(id!);
                setAnime(res.data.data);
            } catch (err) {
                console.error('Error loading anime detail:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchAnime();
    }, [id]);

    if (loading) return <CircularProgress sx={{ mt: 4 }} />;

    if (!anime) return <Typography sx={{ mt: 4 }}>Anime not found.</Typography>;

    const renderSkeleton = () => (
        <Grid container spacing={4}>
            <Grid size={{xs: 12, sm: 4}}>
                <Skeleton variant="rectangular" width="100%" height={300} />
            </Grid>
            <Grid size={{xs: 12, sm: 8}}>
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

    return (
        <Container sx={{ mt: 4 }}>

            <Card>
                <CardMedia
                    component="img"
                    alt="green iguana"
                    height="250"
                    image={anime.images.jpg.image_url}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {anime.title}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 2 }}>
                        {anime.synopsis || 'No synopsis available.'}
                    </Typography>

                    <Grid mt={2} size={{ xs:12}}>
                        <Typography variant="h6" gutterBottom>
                            Stats
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                            <Box sx={{ backgroundColor: 'greenyellow', p: 2, borderRadius: 2, boxShadow: 1 }}>
                                <Typography variant="body1"><strong>Score:</strong> {anime.score ?? 'N/A'} / 10</Typography>
                            </Box>
                            <Box sx={{ backgroundColor: 'orange', p: 2, borderRadius: 2, boxShadow: 1 }}>
                                <Typography variant="body1"><strong>Rated By:</strong> {anime.scored_by?.toLocaleString() ?? 'N/A'} users</Typography>
                            </Box>
                            <Box sx={{ backgroundColor: 'aliceblue', p: 2, borderRadius: 2, boxShadow: 1 }}>
                                <Typography variant="body1"><strong>Popularity Rank:</strong> #{anime.popularity ?? 'N/A'}</Typography>
                            </Box>
                            <Box sx={{ backgroundColor: 'cornsilk', p: 2, borderRadius: 2, boxShadow: 1 }}>
                                <Typography variant="body1"><strong>Members:</strong> {anime.members?.toLocaleString() ?? 'N/A'}</Typography>
                            </Box>

                            <Box sx={{ backgroundColor: 'cornflowerblue', p: 2, borderRadius: 2, boxShadow: 1 }}>
                                <Typography variant="body1"><strong>Rating:</strong> {anime.rating ?? 'N/A'}</Typography>
                            </Box>
                        </Box>
                    </Grid>

                </CardContent>
                <CardActions>
                    <Button variant="text" href="/" size="small">Back</Button>
                </CardActions>
            </Card>
        </Container>
    );
};

export default AnimeDetailPage;
