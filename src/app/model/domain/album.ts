import { Image } from "./image";
import { Owner } from "./play-list";

export interface Album {
    album_type:             string;
    total_tracks:           number;
    href:                   string;
    id:                     string;
    images:                 Image[];
    name:                   string;
    release_date:           string;
    release_date_precision: string;
    type:                   string;
    uri:                    string;
    artists:                Owner[];
}