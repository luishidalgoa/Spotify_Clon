import { Genre } from "../enum/genre";
import { User } from "./user";

export interface Song {
    id?: string;
    title: string;
    description?: string;
    playCount?: number;
    url?: string;
    artwork?: {_150x150?: string,_480x480?: string,_1000x1000?: string};
    duration: number;
    genre: Genre;
    user: User;
}
