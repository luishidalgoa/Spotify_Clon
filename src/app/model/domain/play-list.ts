import { Song } from "./song";
import { User } from "./user";

export interface PlayList {
    id?: number;
    name: string;
    image: string;
    description?: string;
    songs?: Song[];
    color?: string;
    user: User;
}
