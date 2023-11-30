import { Picture } from "./api/audius/picture";
import { Image } from "./image";
import { UserConfiguration } from "./user-configuration";

export interface User {
    country?:          string;
    display_name:     string;
    email?:            string;
    followers?:        Followers;
    href?:             string; //url de la consulta a la api del usuario
    id:               string;
    images?:           Image[];
    product?:          string;
    type:             string;
    config?: UserConfiguration; 
  }
  
  export interface Followers {
    href:  string;
    total: number;
  }