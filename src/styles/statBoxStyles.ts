import { SxProps } from '@mui/material';

export enum StatBoxType {
    Score = 'score',
    RatedBy = 'ratedBy',
    Popularity = 'popularity',
    Members = 'members',
    Rating = 'rating',
}

export const statBoxStyles: Record<StatBoxType, SxProps> = {
    [StatBoxType.Score]: {
        justifyItems:'center',
        width: '150px',
        backgroundColor: 'greenyellow',
        p: 2,
        borderRadius: 2,
        boxShadow: 1,
    },
    [StatBoxType.RatedBy]: {
        width: '150px',
        justifyItems:'center',
        backgroundColor: 'orange',
        p: 2,
        borderRadius: 2,
        boxShadow: 1,
    },
    [StatBoxType.Popularity]: {
        width: '150px',
        justifyItems:'center',
        backgroundColor: 'aliceblue',
        p: 2,
        borderRadius: 2,
        boxShadow: 1,
    },
    [StatBoxType.Members]: {
        width: '150px',
        justifyItems:'center',
        backgroundColor: 'cornsilk',
        p: 2,
        borderRadius: 2,
        boxShadow: 1,
    },
    [StatBoxType.Rating]: {
        width: '150px',
        justifyItems:'center',
        backgroundColor: 'cornflowerblue',
        p: 2,
        borderRadius: 2,
        boxShadow: 1,
    },
};
