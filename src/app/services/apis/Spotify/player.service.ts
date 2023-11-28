import { Injectable, signal, WritableSignal} from '@angular/core';
import { Player } from '../../../model/domain/player';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, interval, map, startWith, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  public currentPlaying$: WritableSignal<Player> = signal({context: {type: '',href: ''},progress_ms: 0,item: {duration_ms: 0,href: '',id: '',name: '',artists: [{name: '',href: '',id: '',images: []}]},currently_playing_type: '',is_playing: false});

  constructor(private _http: HttpClient) {
    this.getPlayingInterval().subscribe((data: Player | any) => {
      const obj = data as Player;
        if(obj.context.href!=='' && (obj.context.href !== this.currentPlaying$().context.href || obj.is_playing !== this.currentPlaying$().is_playing)){
          this.currentPlaying$.set(data);
        }
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
              }
            ]
            },
            currently_playing_type: obj.currently_playing_type,
            is_playing: obj.is_playing,
          }
          return newObj;
        }));
      }

      pauseTrack(): void {
        const url = 'https://api.spotify.com/v1/me/player/pause';
        const headers = new HttpHeaders()
        .set('Authorization', `Bearer ${sessionStorage.getItem('token')}`);
         this._http.put(url, {} ,{headers}).subscribe((data: any) => {
           });

           this.playTrack(this.currentPlaying$().context.href ?? '');

      }

      playTrack(uri:string,pos:number=0,position_ms:number=0): void{
        const url = 'https://api.spotify.com/v1/me/player/play';
        const headers = new HttpHeaders()
        .set('Authorization', `Bearer ${sessionStorage.getItem('token')}`);
        // Configurar el cuerpo de la solicitud
        const body = {
          "context_uri": uri,
          "offset": {
              "position": pos
          },
          "position_ms": position_ms
        };

        this._http.put(url, {body} ,{headers}).subscribe(
          response => {
            this.currentPlaying$;
          },
          error => {
            console.error('Error:', error);
        });
      }

      getPlaying(): Player { //Queremos devolver el resultado de la cancion que se esta reproduciendo
        return this.currentPlaying$();
      }
  }
