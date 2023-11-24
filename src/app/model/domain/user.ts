import { Picture } from "./api/audius/picture";

export interface User {
    id?: string;
    name: string;
    nickName?: string;
    picture?: Picture;
    email?: string;
    playListCount?: number;
    followerCount?: number;
    followeeCount?: number;
}
