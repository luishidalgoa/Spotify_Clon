import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, map } from 'rxjs';
import { PlayList } from '../../../model/domain/play-list';
import { AuthService } from './auth.service';
import { Section } from '../../../model/domain/api/spotify/section';

@Injectable({
  providedIn: 'root'
})
export class PlayListService {

  constructor(private _http: HttpClient,private _auth: AuthService) {

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
      return data;
    })
  }
  getPopularPlayLists(limit:number=15): Observable<PlayList[]> {
    const url = `https://api.spotify.com/v1/browse/featured-playlists`+(limit ? `?limit=${limit}` : '');
    const headers = new HttpHeaders()
        .set('Authorization', `Bearer ${sessionStorage.getItem('token')}`);
    return this._http.get<PlayList[]>(url, {headers});
  }
  /**
   * This method create a new playlist for the current user
   * @param name new name of the playlist
   * @param description of the playlist
   * @param isPublic this param expecifies if the playlist is public or not
   * @returns the new playlist created
   * 
   * @example 
   * {
      "name": "New Playlist",
      "description": "New playlist description",
      "public": false
    }
   */
  createPlayList(name: string, description: string, isPublic: boolean): Observable<PlayList> {
    const url = `https://api.spotify.com/v1/users/${this._auth.currentUser$().id}/playlists`;
    const headers = new HttpHeaders()
        .set('Authorization', `Bearer ${sessionStorage.getItem('token')}`);
    return this._http.post<PlayList>(url, {name, description, public: isPublic}, {headers});
  }

  getOnlyUserPlayLists(limit?:string): Promise<PlayList[]> {
    return new Promise((resolve, reject) => {
      const PlayLists: PlayList[] = []
      this.getUserPlayLists().subscribe((data: any) => {
        data.items.forEach((item: PlayList) => {
          if(item.owner.id === this._auth.currentUser$().id){
            PlayLists.push(item)
          }
        });
        resolve(PlayLists);
      })
    });
  }

  getPlayListsBySection(section:Section,limit:number=15): Observable<PlayList[]> {
    const url = `https://api.spotify.com/v1/browse/categories/${section.id}/playlists?limit=${limit}`;
    const headers = new HttpHeaders()
        .set('Authorization', `Bearer ${sessionStorage.getItem('token')}`);
    return this._http.get<PlayList[]>(url, {headers}).pipe(
      map((data: any) => {
        return [
          ...data.playlists.items
        ]
      })
    );
  }

}
