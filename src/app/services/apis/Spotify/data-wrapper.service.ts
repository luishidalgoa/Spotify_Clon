import { Injectable, WritableSignal, effect, inject, signal } from '@angular/core';
import { PlayListService } from './play-list.service';
import { ArtistService } from './artist.service';
import { PlayList } from '../../../model/domain/play-list';
import { Artist } from '../../../model/domain/artist';
import { map, take, toArray } from 'rxjs';
import { User } from '../../../model/domain/user';
import { ReduceData } from '../../../model/domain/api/spotify/reduce-data';
import { Album } from '../../../model/domain/album';
import { AlbumService } from './album.service';

@Injectable({
  providedIn: 'root',
})
export class DataWrapperService {
  private _playList: PlayListService = inject(PlayListService);
  private _artist: ArtistService = inject(ArtistService);
  private _album: AlbumService = inject(AlbumService);
  
  public _dataWrapper$: WritableSignal<ReduceData[]> = signal([] as ReduceData[]);
  //Almacenará las playLists que siga el usuario temporalmente
  playLists: PlayList[] = [];
  //Almacenará los artistas que siga el usuario temporalmente
  artists: Artist[] = [];

  albums: Album[] = [];

  constructor() {
    let wrapper: ReduceData[] = [];
    this._playList.getUserPlayLists().subscribe((data: any) => {
      this.playLists.push(...data.items);
      this.playLists.forEach((playList: PlayList) => { //Extraemos los datos del array de playLists y los metemos en el array wrapper
        wrapper.push(this.convertPlayListToDataWrapper(playList));
      });
    })
    this._artist.getFollowedArtist().subscribe((data: any) => {
      this.artists.push(...data.artists.items);
      this.artists.forEach((artist: Artist) => { //Extraemos los datos del array de artistas y los metemos en el array wrapper
        wrapper.push(this.convertArtistToDataWrapper(artist));
      });
    }).add(() => {
      this._dataWrapper$.update(() => this.shuffleArray(wrapper)); //Actualizamos el wrapper
    });

    this._album.getFollowedAlbums().subscribe((data: any) => {
      this.albums.push(...data.items);
      this.albums.forEach((album: Album) => { //Extraemos los datos del array de artistas y los metemos en el array wrapper
        wrapper.push(this.convertAlbumToDataWrapper(album));
      });
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
      uri: artist.uri,
      type: artist.type,
      id: artist.id,
    }
  }

  convertAlbumToDataWrapper(album: any): ReduceData{
    return {
      owner: album.album.artists[0] as Artist,
      description: '',
      title: album.album.name,
      image: album.album.images !== undefined && album.album.images.length > 0 ? album.album.images[0].url : '',
      uri: album.album.uri,
      type: album.album.type,
      id: album.album.id,
    }
  }

  getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  shuffleArray(array:ReduceData[]): ReduceData[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = this.getRandomNumber(0, i);
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array as ReduceData[];
  }
}
