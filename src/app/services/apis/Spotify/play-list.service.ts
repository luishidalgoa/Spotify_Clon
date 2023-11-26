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
    this.getUserPlayLists();
   }

  getUserPlayLists(): void {
    const url = `https://api.spotify.com/v1/me/playlists`
    const headers = new HttpHeaders()
        .set('Authorization', `Bearer ${sessionStorage.getItem('token')}`);
    this._http.get(url,{headers: headers}).subscribe((data: PlayList | any) => {
      this.playLists$.set(data.items);
    });
  }

  getPlayList(id: string): Subscription {
    const url = `https://api.spotify.com/v1/playlists/${id}`
    const headers = new HttpHeaders()
        .set('Authorization', `Bearer ${sessionStorage.getItem('token')}`);
    return this._http.get(url, {headers}).subscribe((data: PlayList | any) => {
      console.log(data)
      return data;
    })
  }

}
