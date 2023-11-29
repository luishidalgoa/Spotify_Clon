import { Injectable, signal, WritableSignal} from '@angular/core';
import { Player } from '../../../model/domain/player';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, interval, map, startWith, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  public currentPlaying$: WritableSignal<Player> = signal({
    context: {type: '',href: ''},
    progress_ms: 0,
    item: {
      duration_ms: 0,
      href: '',
      id: '',
      name: '',
      artists: [{name: '', href: '', id: '', type: '', images: []}] // add type property here
    },
    currently_playing_type: '',
    is_playing: false
  });

  constructor(private _http: HttpClient) {
    this.getPlayingInterval().subscribe((data: Player | any) => {
      const obj = data as Player;
      this.currentPlaying$.set(data);
    });
  }


  getPlayingInterval(): Observable<Player> {
    const url= 'https://api.spotify.com/v1/me/player/currently-playing';
    const headers = new HttpHeaders()
        .set('Authorization', `Bearer ${sessionStorage.getItem('token')}`);
    return interval(5000).pipe(
      startWith(0), // Emite un valor inmediatamente al inicio
      switchMap(() => this._http.get(url, {headers})),
      map((data: Player | any) => {
        const obj = data as Player;
        if(obj){
          const newObj: Player = {
            context: {
              type: obj.context.type,
              href: obj.context.href || '',
            },
            progress_ms: obj.progress_ms,
            item: {
              duration_ms: obj.item.duration_ms,
              href: obj.item.href,
              id: obj.item.id,
              name: obj.item.name,
              artists: [
                {
                  name: obj.item.artists?.[0].name!==undefined ? obj.item.artists[0].name : '',
                  href: obj.item.artists?.[0].href!==undefined ? obj.item.artists?.[0].href : '',
                  id: obj.item.artists?.[0].id!==undefined ? obj.item.artists[0].id : '',
                  images: obj.item.artists?.[0].images!==undefined ? obj.item.artists[0].images : [],
                  type: obj.item.artists?.[0].type!==undefined ? obj.item.artists[0].type : '',
                }
              ]
              },
              currently_playing_type: obj.currently_playing_type,
              is_playing: obj.is_playing,
            }
            return newObj;
        }else {
            return this.currentPlaying$();
        }
      }));
    }

      async pauseTrack(): Promise<boolean> {
        const url = 'https://api.spotify.com/v1/me/player/pause';
        const headers = new HttpHeaders()
          .set('Authorization', `Bearer ${sessionStorage.getItem('token')}`);
      
        try {
          await this._http.put(url, {}, {headers}).toPromise();
          return true;
        } catch (error) {
          console.error('Error:', error);
          return false;
        }
      }

      async play(uri:string,pos:number=0,position_ms:number=0):Promise<boolean>{
        const url = 'https://api.spotify.com/v1/me/player/play';
        const headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${sessionStorage.getItem('token')}`);

        const body = {
          "context_uri": uri,
          "offset": {
              "position": pos
          },
          "position_ms": position_ms
        };
        const oldUri = this.currentPlaying$().context.href;
        try {
          await this._http.put(url, JSON.stringify(body), { headers }).toPromise();
          return this.getPlaying().then((data)=>{
            return oldUri !== data?.context.href;
          });
        } catch (error) {
          console.error('Error:', error);
          return false;
        }
      }


      addQuote(uri:string){

      }

      async getPlaying(): Promise<Player | undefined> {
        const url= 'https://api.spotify.com/v1/me/player/currently-playing';
        const headers = new HttpHeaders()
            .set('Authorization', `Bearer ${sessionStorage.getItem('token')}`);
        try{
          return await this._http.get(url, {headers}).pipe(
            map((data: Player | any) => {
              const obj = data as Player;
              if(obj){
                const newObj: Player = {
                  context: {
                    type: obj.context.type,
                    href: obj.context.href || '',
                  },
                  progress_ms: obj.progress_ms,
                  item: {
                    duration_ms: obj.item.duration_ms,
                    href: obj.item.href,
                    id: obj.item.id,
                    name: obj.item.name,
                    artists: [
                      {
                        name: obj.item.artists?.[0].name!==undefined ? obj.item.artists[0].name : '',
                        href: obj.item.artists?.[0].href!==undefined ? obj.item.artists?.[0].href : '',
                        id: obj.item.artists?.[0].id!==undefined ? obj.item.artists[0].id : '',
                        images: obj.item.artists?.[0].images!==undefined ? obj.item.artists[0].images : [],
                        type: obj.item.artists?.[0].type!==undefined ? obj.item.artists[0].type : '',
                      }
                    ]
                    },
                    currently_playing_type: obj.currently_playing_type,
                    is_playing: obj.is_playing,
                  }
                  this.currentPlaying$.set(newObj);
                  return newObj;
                }else {
                  return this.currentPlaying$();
                }
              })
          ).toPromise();
        }catch(err){
          console.log(err)
          return this.currentPlaying$();
        }
      }
  }