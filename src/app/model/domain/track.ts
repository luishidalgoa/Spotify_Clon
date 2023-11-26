import { Album } from "./album";
import { Artist } from "./artist";

export interface Tracks {
    href?:     string; //consulta a la api del usuario dueño de la playlist
    limit?:    number;
    next:     string;
    offset:   number;
    previous: string;
    total:    number;
    items:    Track[];
}

export interface Track {
    album:             Album;
    artists:           Artist[];
    available_markets: string[];
    disc_number:       number;
    duration_ms:       number;
    explicit:          boolean;
    href:              string;
    id:                string;
    is_playable:       boolean;
    name:              string;
    popularity:        number;
    preview_url:       string;
    track_number:      number;
    type:              string;
    uri:               string;
    is_local:          boolean;
}
