import { Injectable } from '@angular/core';
import { FetchService } from './fetch.service';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  constructor(private fetch: FetchService) { }

  getArtist(filterWord: string){
    this.fetch.getQuery('search?q='+filterWord+'&type=artist').subscribe((data: any)=>{
      console.log(data)
    });
  }
}
