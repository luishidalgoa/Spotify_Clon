import { Album } from "./album";
import { Artist } from "./artist";

export interface Player {
    context:                Context;
    progress_ms:            number;
    item:                   Item;
    currently_playing_type: string;
    is_playing:             boolean;
}

export interface ExternalIDS {
    isrc: string;
}


export interface Item {
    album?:             Album;
    artists?:           Artist[];
    disc_number?:       number;
    duration_ms:       number;
    href:              string;
    id:                string;
    name:              string;
    preview_url?:       string;
    track_number?:      number;
}

export interface Context {
    href:          string | undefined;
    type:          string;
    uri:           string;
}