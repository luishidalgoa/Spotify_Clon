export interface User {
    id?: number;
    name: string;
    nickName?: string;
    picture?: {_150x150: string,_480x480: string,_1000x1000: string};
    email?: string;
    playListCount?: number;
    followerCount?: number;
    followeeCount?: number;
}
