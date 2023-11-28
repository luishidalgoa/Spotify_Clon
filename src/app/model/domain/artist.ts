import { Image } from "./image";
import { ExternalUrls } from "./play-list";
import { Followers } from "./user";

export interface Artist {
  followers?:     Followers;
  genres?:        string[];
  href:          string;
  id:            string;
  images:        Image[];
  name:          string;
  popularity?:    number;
}