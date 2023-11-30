import { Injectable, WritableSignal, effect, inject, signal } from '@angular/core';
import { PlayListService } from './play-list.service';
import { ArtistService } from './artist.service';
import { PlayList } from '../../../model/domain/play-list';
import { Artist } from '../../../model/domain/artist';
import { map, take, toArray } from 'rxjs';
import { User } from '../../../model/domain/user';
import { ReduceData } from '../../../model/domain/api/spotify/reduce-data';

@Injectable({
  providedIn: 'root',
})
export class DataWrapperService {
  private _playList: PlayListService = inject(PlayListService);
  private _artist: ArtistService = inject(ArtistService);

  public _dataWrapper$: WritableSignal<[ReduceData]> = signal([{title: '',description: '',image: '',uri: '',type: '',id: '',}]);
  //Almacenará las playLists que siga el usuario temporalmente
  playLists: PlayList[] = [];
  //Almacenará los artistas que siga el usuario temporalmente
  artists: Artist[] = [];

  constructor() {
    let wrapper: any[] = [];
    this._playList.getUserPlayLists().subscribe((data: any) => {
      this.playLists.push(...data.items);
      this.playLists.forEach((playList: PlayList) => { //Extraemos los datos del array de playLists y los metemos en el array wrapper
        wrapper.push(this.convertPlayListToDataWrapper(playList));
      });
      const aux = wrapper as [ReduceData];
      this._dataWrapper$.update(() => aux); //Actualizamos el wrapper
    })
    this._artist.getFollowedArtist().subscribe((data: any) => {
      this.artists.push(...data.artists.items);
      this.artists.forEach((artist: Artist) => { //Extraemos los datos del array de artistas y los metemos en el array wrapper
        wrapper.push(this.convertArtistToDataWrapper(artist));
      });
      const aux = wrapper as [ReduceData];
      this._dataWrapper$.update(() => aux); //Actualizamos el wrapper
    })
  }

  convertPlayListToDataWrapper(playList: PlayList): ReduceData{
    return {
      title: playList.name,
      description: playList.description,
      image:
        playList.images !== undefined && playList.images.length > 0 ? playList.images[0].url : '',
      uri: playList.uri,
      type: playList.type,
      id: playList.id,
      owner: {...playList.owner} as User,
    }
  }
  convertArtistToDataWrapper(artist: Artist): ReduceData{
    return {
      title: artist.name,
      description: '',
      image: artist.images !== undefined && artist.images.length > 0 ? artist.images[0].url : '',
      uri: artist.href,
      type: artist.type,
      id: artist.id,
    }
  }
}
