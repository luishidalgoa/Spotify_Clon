import { Genre } from "../enum/genre";
import { Picture } from "./api/audius/picture";
import { User } from "./user";

export interface Song {
    id?: string;
    title: string;
    description?: string;
    playCount?: number;
    url?: string;
    artwork?: Picture;
    duration: number;
    genre: Genre;
    user: User;
}
