export interface Anime {
    mal_id: number;
    title: string;
    synopsis?: string;
    images: {
        jpg: {
            image_url: string;
        };
    };
    rank?:number,
    score?: number;
    scored_by?: number;
    popularity?: number;
    members?: number;
    rating?: string;
}
