import { Injectable, WritableSignal, signal } from '@angular/core';
import { PlayListService } from './play-list.service';
import { ArtistService } from './artist.service';
import { Artist } from '../../../model/domain/artist';
import { User } from '../../../model/domain/user';
import { ReduceData } from '../../../model/domain/api/spotify/reduce-data';
import { AlbumService } from './album.service';

@Injectable({
  providedIn: 'root',
})
export class DataWrapperService {

  public _dataWrapper$: WritableSignal<ReduceData[]> = signal([] as ReduceData[]);

  constructor(private _playList: PlayListService,private _artist: ArtistService,private _album: AlbumService) {
    
    new Promise<ReduceData[]>(async (resolve) => {
      await this.getPlayLists().then((data: ReduceData[]) => {
        this._dataWrapper$.update((values) => [...values,...data]);
      });
      await this.getArtists().then((data: ReduceData[]) => {
        this._dataWrapper$.update((values) => [...values,...data]);
      });
      await this.getAlbums().then((data: ReduceData[]) => {
        this._dataWrapper$.update((values) => [...values,...data]);
      })
      resolve(this._dataWrapper$());
    }).then((data: ReduceData[]) => {
      this._dataWrapper$.set(this.suffle(data));
    });
  }

  async getPlayLists(): Promise<ReduceData[]> {
    let wrapper: ReduceData[] = [];
    return new Promise((resolve, reject) => {	
      this._playList.getUserPlayLists().subscribe((data: any) => {
        for(let item of data.items){
          wrapper.push(this.convertPlayListToDataWrapper(item));
        }
      }).add(()=>{
        resolve(wrapper);
      })
    });
  };

  async getArtists(): Promise<ReduceData[]> {
    let wrapper: ReduceData[] = [];
    return new Promise((resolve, reject) => {
      this._artist.getFollowedArtist().subscribe((data: any) => {
        for(let item of data.artists.items){
          wrapper.push(this.convertArtistToDataWrapper(item));
        }
      }).add(()=>{
        resolve(wrapper);
      });
    });
  };

  async getAlbums(): Promise<ReduceData[]> {
    let wrapper: ReduceData[] = [];
    return new Promise((resolve, reject) => {
      this._album.getFollowedAlbums().subscribe((data: any) => {
        for(let item of data.items){
          wrapper.push(this.convertAlbumToDataWrapper(item));
        }
      }).add(()=>{
        resolve(wrapper);
      });
    });
  };


  convertPlayListToDataWrapper(playList: any): ReduceData{
    return {
      item: {
        title: playList.name,
        description: playList.description,
        image:
          playList.images !== undefined && playList.images.length > 0 ? playList.images[0].url : '',
        uri: playList.uri,
        type: playList.type,
        id: playList.id,
        owner: {...playList.owner} as User,
      },
    }
  }
  convertArtistToDataWrapper(artist: any): ReduceData{
    return {
      item: {
        title: artist.name,
        description: '',
        image: artist.images !== undefined && artist.images.length > 0 ? artist.images[0].url : '',
        uri: artist.uri,
        type: artist.type,
        id: artist.id,
      },
    }
  }

  convertAlbumToDataWrapper(album: any): ReduceData{
    return {
      item: {
        owner: album.album.artists[0] as Artist,
        description: '',
        title: album.album.name,
        image: album.album.images !== undefined && album.album.images.length > 0 ? album.album.images[0].url : '',
        uri: album.album.uri,
        type: album.album.type,
        id: album.album.id,
      },
      added_at: new Date(album.added_at)
    }
  }

  orderByDate(array:ReduceData[]): ReduceData[] {
    return array.sort((a: ReduceData, b: ReduceData) => {
      if (a?.added_at !== undefined && b?.added_at !== undefined){
        let a1= a.added_at as Date;
        let b1= b.added_at as Date;
        return b1.valueOf() - a1.valueOf()>0?1:-1;
      }
      return 1;
    });
  }

  suffle(array:ReduceData[]): ReduceData[] {
    return array.sort(() => Math.random() - 0.5);
  }
}
