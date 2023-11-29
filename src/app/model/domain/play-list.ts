import { Image } from "./image";
import { Tracks } from "./track";
import { Followers } from "./user";

export interface PlayList {
    collaborative: boolean;
    description:   string;
    external_urls: ExternalUrls;
    followers:     Followers;
    href:          string;
    id:            string;
    images?:        Image[] | undefined;
    name:          string;
    owner:         Owner;
    public:        boolean;
    snapshot_id:   string;
    tracks:        Tracks;
    type:          string;
    uri:           string;
}
export interface ExternalUrls {
    spotify: string;
}

export interface Owner {
    followers?:    Followers;
    href:          string;
    id:            string;
    type:          string;
    uri:           string;
    display_name?: string;
    name?:         string;
}