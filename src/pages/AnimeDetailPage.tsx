import React from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {
    Container,
    Typography,
    CardMedia,
    CardContent,
    Button,
    Card,
    Grid,
    Box,
    Divider,
} from '@mui/material';
import { useAnimeDetail } from '../hooks/useAnimeDetail';
import SingleSkeleton from "../components/SingleSkeleton";
import { statBoxStyles, StatBoxType } from '../styles/statBoxStyles';

const AnimeDetailPage: React.FC = () => {
    const { id } = useParams();
    const { anime, loading, error } = useAnimeDetail(id);
    const navigate = useNavigate();

    if (loading) return <SingleSkeleton />;

    if (error) return <Typography sx={{ mt: 4 }} color="error">{error}</Typography>;

    if (!anime) return <Typography sx={{ mt: 4 }}>Anime not found.</Typography>;


    return (
        <Container sx={{ mt: 4 }}>
            {loading && <SingleSkeleton/>}
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
                            <Box sx={statBoxStyles[StatBoxType.Score]}>
                                <Typography variant="h5" fontWeight={800}>{anime.score ?? 'N/A'}</Typography>
                                <Typography variant="caption" textTransform={'uppercase'}>{anime.scored_by?.toLocaleString() ?? 'N/A'} users</Typography>
                            </Box>
                            <Box sx={statBoxStyles[StatBoxType.RatedBy]}>
                                <Typography variant="h5" fontWeight={800}>#{anime.rank ?? 'N/A'}</Typography>
                                <Typography variant="caption" textTransform={'uppercase'}>Ranked</Typography>
                            </Box>
                            <Box sx={statBoxStyles[StatBoxType.Popularity]}>
                                <Typography variant="h5" fontWeight={800}>#{anime.popularity ?? 'N/A'}</Typography>
                                <Typography variant="caption" textTransform={'uppercase'}>Popularity</Typography>
                            </Box>
                            <Box sx={statBoxStyles[StatBoxType.Members]}>
                                <Typography variant="h5" fontWeight={800}>{anime.members?.toLocaleString() ?? 'N/A'}</Typography>
                                <Typography variant="caption" textTransform={'uppercase'}>Members</Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Box mt={2}>
                        <Button variant="contained" onClick={() => navigate('/')}>Back</Button>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
};

export default AnimeDetailPage;
