import { Image } from "./image";
import { ExternalUrls } from "./play-list";
import { Followers } from "./user";

export interface Artist {
  external_urls: ExternalUrls;
  followers:     Followers;
  genres:        string[];
  href:          string;
  id:            string;
  images:        Image[];
  name:          string;
  popularity:    number;
  type:          string;
  uri:           string;
}