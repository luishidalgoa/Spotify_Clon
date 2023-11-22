import { Picture } from "./api/audius/picture";
import { Artist } from "./artist";
import { Song } from "./song";

export interface Album {
    id: number;
    name: string;
    picture: Picture;
    playCount: number;
    songs: Song[];
    artist: Artist;
}
