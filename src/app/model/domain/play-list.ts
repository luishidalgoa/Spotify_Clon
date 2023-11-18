import { Song } from "./song";

export interface PlayList {
    id: number;
    name: string;
    image: string;
    description: string;
    songs: Song[];
    color: string;
}
