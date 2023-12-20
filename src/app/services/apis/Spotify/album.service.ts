import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Album } from '../../../model/domain/album';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor(private _http: HttpClient) { }


  getFollowedAlbums(): Observable<any>{
    const URL = `https://api.spotify.com/v1/me/albums`;
    const headers = new HttpHeaders().set(
      'Authorization',`Bearer ${sessionStorage.getItem('token')}`
    );
    return this._http.get(URL, {headers: headers});
  }

  getNewReleases(limit:number=15): Observable<Album[]>{
    const URL = `https://api.spotify.com/v1/browse/new-releases?limit=${limit}`;
    const headers = new HttpHeaders().set(
      'Authorization',`Bearer ${sessionStorage.getItem('token')}`
    );
    return this._http.get(URL, {headers: headers}).pipe(
      map((data: any) => {
        let aux:Album[]= [];
        aux = [
            ...data.albums.items.map((item: any) => {
              return {
                id: item.id,
                name: item.name,
                artists: item.artists,
                images: item.images,
                release_date: item.release_date,
                total_tracks: item.total_tracks,
                type: item.type,
                uri: item.uri
              }
            })
          ];
        return aux;
      }));
  }
}
