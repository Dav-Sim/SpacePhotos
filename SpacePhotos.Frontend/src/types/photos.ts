
export interface DayPhoto {
    copyright: string;
    date: string;
    explanation: string;
    hdurl: string;
    title: string;
    url: string;
    mediaType: string;
    videoThumbnail?: string;
}

export interface EarthPhoto {
    identifier: string;
    caption: string;
    image: string;
    version: string;
    date: string;
    lat: number;
    lon: number;
    url: string;
    hdurl: string;
}