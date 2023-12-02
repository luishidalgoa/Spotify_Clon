import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { PlayList } from '../../../model/domain/play-list';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PlayListService {

  public playLists$!: WritableSignal<PlayList[]>;

  constructor(private _http: HttpClient,private _auth: AuthService) {
    this.playLists$ = signal([]);
    this.getUserPlayLists().subscribe((data: any) => 
      this.playLists$.set(data.items)
    );
    this.getUserPlayLists();

   }

   getUserPlayLists(limit?:string): Observable<PlayList | any> {
    const url = `https://api.spotify.com/v1/me/playlists`+ (limit ? `?limit=${limit}` : '');
    const headers = new HttpHeaders()
        .set('Authorization', `Bearer ${sessionStorage.getItem('token')}`);
    return this._http.get<PlayList | any>(url, {headers: headers});
}

  getPlayList(id: string): Subscription {
    const url = `https://api.spotify.com/v1/playlists/${id}`
    const headers = new HttpHeaders()
        .set('Authorization', `Bearer ${sessionStorage.getItem('token')}`);
    return this._http.get(url, {headers}).subscribe((data: PlayList | any) => {
      console.log("PLAYLIST Service",data)
      return data;
    })
  }
  getPopularPlayLists(limit:number=15): Observable<PlayList[]> {
    const url = `https://api.spotify.com/v1/browse/featured-playlists`+(limit ? `?limit=${limit}` : '');
    const headers = new HttpHeaders()
        .set('Authorization', `Bearer ${sessionStorage.getItem('token')}`);
    return this._http.get<PlayList[]>(url, {headers});
  }

}
