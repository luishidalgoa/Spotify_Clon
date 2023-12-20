import { Component, Signal, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediumCardComponent } from '../../components/cards/medium-card/medium-card.component';
import { PlayList } from '../../model/domain/play-list';
import { PlayListService } from '../../services/apis/Spotify/play-list.service';
import { LanguageService } from '../../services/language.service';
import { map } from 'rxjs';
import { SectionComponent } from '../section/section.component';
import { AuthService } from '../../services/apis/Spotify/auth.service';
import { ReduceData } from '../../model/domain/api/spotify/reduce-data';
import { DataWrapperService } from '../../services/apis/Spotify/data-wrapper.service';
import { ArtistService } from '../../services/apis/Spotify/artist.service';
import { SyncViewService } from '../../services/common/sync-view.service';
import { Section, Sections } from '../../model/domain/api/spotify/section';
import { SectionService } from '../../services/common/section.service';
import { AlbumService } from '../../services/apis/Spotify/album.service';
import { Album } from '../../model/domain/album';

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [CommonModule,MediumCardComponent,SectionComponent],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.scss'
})
export class PreviewComponent {
  dictionary!: any;
  private syncS = inject(SyncViewService);
  sections: Sections = {href:'',items:[],limit:0,next:'',offset:0,previous:'',total:0};

  _dataWrapper: DataWrapperService = inject(DataWrapperService);

  welcome$: Signal<ReduceData[]> = signal([] as ReduceData[])

  constructor(private _playLists:PlayListService,private _language: LanguageService,public _auth: AuthService,private _artist: ArtistService) { 
    this._language.getDiccionary
    .pipe(
      map((data: any) => {
        const { lang, components, login, ...rest } = data; //devolvemos diccionary.components.Slide_Menu
        return rest;
      })
    ).subscribe((data: any) => {
      this.dictionary = data;
      return data;
    });
    this.welcome$ = computed(()=> this._dataWrapper._dataWrapper$().slice(0,6));

    this.generateSections();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  getGreeting():string{
    const date = new Date();
    const hour = date.getHours();
    if(hour >= 0 && hour < 12){
      return this.dictionary.words.messages.greetings.morning;
    }else if(hour >= 12 && hour < 19){
      return this.dictionary.words.messages.greetings.afternoon;
    }else if(hour >= 19 && hour < 21){
      return this.dictionary.words.messages.greetings.evening;
    }else{
      return this.dictionary.words.messages.greetings.night;
    }
  }

  private _section: SectionService = inject(SectionService);
  private _album: AlbumService = inject(AlbumService);
  generateSections():void{

      this._section.getListSections().subscribe((data: Sections) => {
        new Promise<void>(() => {
          for(let s of data.items){// me devuelve el item de cada seccion. Ej: Top Lists, Pop, Rock, etc
            s.items = [];
            this._section.getSectionItems(s).then((items: Section) => {
              this.sections.items.push(items);
            })
          }
        }).then(() => {
          this.syncS.sendSync();
        });
      })
    
    this._artist.bestArtistsByUser(15).subscribe((data: any) => {
      let wrapper: Section = { href:'', icons:{url:'',height:0,width:0},id:this.dictionary.words.messages.sections.recommendArtists.replace(' ','%').trim(), name: this.dictionary.words.messages.sections.recommendArtists, items: [] };
      for(let a of data.items){
        let aux = this._dataWrapper.convertArtistToDataWrapper(a) as ReduceData;
        wrapper.items.push(aux);
      }
      this.sections.items.push(wrapper);
      this.syncS.sendSync();
    });

    this._album.getNewReleases(15).subscribe((data: Album[]) => {
      let wrapper: Section = { href:'', icons:{url:'',height:0,width:0},id:this.dictionary.words.messages.sections.newAlbums.replace(' ','%').trim(), name: this.dictionary.words.messages.sections.newAlbums, items: [] };
      for(let a of data){
        let aux = this._dataWrapper.convertAlbumToDataWrapper(a) as ReduceData;
        wrapper.items.push(aux);
      }
      this.sections.items.push(wrapper);
      this.syncS.sendSync();
    });
  };
}
