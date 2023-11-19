import { Artist } from "./artist";
import { Song } from "./song";

export interface Album {
    id: number;
    name: string;
    picture: {_150x150: string,_480x480: string,_1000x1000: string};
    playCount: number;
    songs: Song[];
    artist: Artist;
}
