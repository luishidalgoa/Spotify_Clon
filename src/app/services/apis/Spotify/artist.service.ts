import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Artist } from '../../../model/domain/artist';
declare var window: any;
@Injectable({
  providedIn: 'root',
})
export class ArtistService {
  constructor(private _http: HttpClient) {}

  getFollowedArtist(): Observable<any>{
    const URL = `https://api.spotify.com/v1/me/following?type=artist`;
    const headers = new HttpHeaders().set(
      'Authorization',`Bearer ${sessionStorage.getItem('token')}`
    );
    return this._http.get(URL, {headers: headers});
  }
  bestArtistsByUser(limit:number=10): Observable<Artist[]>{
    const url = `https://api.spotify.com/v1/me/top/artists`+(limit ? `?limit=${limit}` : '');
    const headers = new HttpHeaders()
        .set('Authorization', `Bearer ${sessionStorage.getItem('token')}`);
    return this._http.get<Artist[]>(url, {headers});
  }
}
