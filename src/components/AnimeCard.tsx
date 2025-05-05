import React from 'react';
import {Card, CardMedia, CardContent, Typography} from '@mui/material';
import { Anime } from '../types/anime';

interface Props {
    anime: {
        mal_id: number;
        title: string;
        images: {
            jpg: { image_url: string };
        };
    };
    onClick: () => void;
}

const AnimeCard: React.FC<Props> = ({ anime, onClick }) => (
    <Card sx={{ cursor: 'pointer' }} onClick={onClick}>
        <CardMedia
            component="img"
            height="300"
            image={anime.images.jpg.image_url}
            alt={anime.title}
        />
        <CardContent>
            <Typography variant="h6" noWrap>{anime.title}</Typography>
        </CardContent>
    </Card>



);

export default AnimeCard;
