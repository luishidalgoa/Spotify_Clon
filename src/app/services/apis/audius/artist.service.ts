import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
declare var window: any;
@Injectable({
  providedIn: 'root',
})
export class ArtistService {
  constructor(private _http: HttpClient) {}

  getQuery(query: string) {
    const URL = `https://api.spotify.com/v1/${query}`;
    const headers = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      }),
    };

    return this._http.get(URL, headers);
  }
}
