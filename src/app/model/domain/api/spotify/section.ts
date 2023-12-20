import { Image } from "../../image";
import { ReduceData } from "./reduce-data";

export interface Sections {
    href: string; // Enlace de la consulta que se ha realizado a la API de Spotify
    limit: number; // El número máximo de elementos que se devolverán
    next: string; // Enlace a la siguiente página de elementos . Tiene como parámetro offset el número de elementos que se han devuelto en la consulta anterior
    offset: number; // El número de elementos que se han devuelto en la consulta actual
    previous: string; // Enlace a la página anterior de elementos . Tiene como parámetro offset el número de elementos que se han devuelto en la consulta anterior
    total: number; // El número total de elementos totales que se pueden devolver
    items: Section[]; // Array de elementos que se han devuelto en la consulta
}

export interface Section {
    href: string; // Enlace de la consulta que se ha realizado a la API de Spotify
    icons: Image; // Array de iconos que representan la sección
    id: string; // Identificador de la sección
    name: string; // Nombre de la sección
    items: ReduceData[] // Array de elementos de la seccion (playlists)
}