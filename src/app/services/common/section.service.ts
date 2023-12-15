import { Injectable } from '@angular/core';
import { ReduceData } from '../../model/domain/api/spotify/reduce-data';
import { BehaviorSubject } from 'rxjs';
import { PlayListService } from '../apis/Spotify/play-list.service';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  sectionItems: BehaviorSubject<{title: string, data?: ReduceData[]} | null>

  constructor() {
    this.sectionItems = new BehaviorSubject<{title: string, data?: ReduceData[]} | null> (null);
  }


  public get getSectionItems(): BehaviorSubject<{title: string, data?: ReduceData[]} | null> {
    return this.sectionItems;
  }

  public set setSectionItems(items: {title: string, data?: ReduceData[]}) {
    this.sectionItems.next(items);
  }

  public resetSectionItems(){
    this.sectionItems.next(null);
  }
}
