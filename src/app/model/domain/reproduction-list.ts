import { Song } from "./song";

export interface ReproductionList {
    id: number;
    name: string;
    image: string;
    description: string;
    songs: Song[];
}
