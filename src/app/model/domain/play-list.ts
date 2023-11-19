import { Song } from "./song";
import { User } from "./user";

export interface PlayList {
    id?: number;
    name?: string;
    owner: User;
    songs?: Song[];
    totalTime?: number;
    followersCount?: number;
    dateRelease?: Date;
    picture: string;
}
