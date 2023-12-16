import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
}
