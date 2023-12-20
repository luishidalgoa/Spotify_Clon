import { Injectable, inject } from '@angular/core';
import { ReduceData } from '../../model/domain/api/spotify/reduce-data';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { PlayListService } from '../apis/Spotify/play-list.service';
import { Section, Sections } from '../../model/domain/api/spotify/section';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PlayList } from '../../model/domain/play-list';
import { DataWrapperService } from '../apis/Spotify/data-wrapper.service';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  sectionItems: BehaviorSubject<Section | null>

  constructor(private _http: HttpClient) {
    this.sectionItems = new BehaviorSubject<Section | null> (null);
  }

  private _playlist: PlayListService = inject(PlayListService);
  private _datawrapper: DataWrapperService = inject(DataWrapperService);
  public getSectionItems(section?:Section): Promise<Section> {
    return new Promise((resolve) => {
      if(section?.items){ //ERROR
        this._playlist.getPlayListsBySection(section as Section,15).subscribe((data: PlayList[]) => {
          const items:Section = section
          for(let aux of data){
            if(aux){
              items.items.push(this._datawrapper.convertPlayListToDataWrapper(aux));
            }
          }
          resolve(items);
        });
      }else{
        resolve(this.sectionItems.value as Section);
      }
    });
  }

  public set setSectionItems(items: Section) {
    this.sectionItems.next(items);
  }

  public resetSectionItems(){
    this.sectionItems.next(null);
  }


  getListSections(limit:number=5,offset:number=0): Observable<Sections> {
    const url = `https://api.spotify.com/v1/browse/categories?limit=${limit}&offset=${offset}`
    const headers = new HttpHeaders()
        .set('Authorization', `Bearer ${sessionStorage.getItem('token')}`);
    return this._http.get<Sections>(url, {headers}).pipe(
      map((data: any) => { 
        return { href: data.categories.href, items: data.categories.items, limit: data.categories.limit, next: data.categories.next, offset: data.categories.offset, previous: data.categories.previous, total: data.categories.total};
      })
    )
    
  }
}
