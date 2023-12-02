import { Component, inject } from '@angular/core';
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
import { Artist } from '../../model/domain/artist';

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [CommonModule,MediumCardComponent,SectionComponent],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.scss'
})
export class PreviewComponent {
  welcome!: PlayList[];
  dictionary!: any;

  sections: {title: string, data?: ReduceData[]}[] = []

  _dataWrapper: DataWrapperService = inject(DataWrapperService);

  constructor(private _playLists:PlayListService,private _language: LanguageService,public _auth: AuthService,private _artist: ArtistService) { 
    this._language.diccionary
    .pipe(
      map((data: any) => {
        const { lang, components, login, ...rest } = data; //devolvemos diccionary.components.Slide_Menu
        return rest;
      })
    ).subscribe((data: any) => {
      this.dictionary = data;
      return data;
    });
  }

  ngOnInit(): void {
    this._playLists.getUserPlayLists('6').subscribe((data: any) => {
      this.welcome = data.items;
    })

    this.generateSections();
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

  generateSections():void{
    const popularLists: ReduceData[] = []
    this._playLists.getPopularPlayLists(7).subscribe((data: any) => {
      data.playlists.items.forEach((data:PlayList)=>{
        popularLists.push(this._dataWrapper.convertPlayListToDataWrapper(data));
      })
    })
    const artists: ReduceData[] = []
    this._artist.bestArtistsByUser(7).subscribe((data: any) => {
      data.items.forEach((data:Artist)=>{
        artists.push(this._dataWrapper.convertArtistToDataWrapper(data));
      })
    })
    setTimeout(() => {
      this.sections = [
        {title: this.dictionary.words.messages.sections.popularLists, data: popularLists},
        {title: this.dictionary.words.messages.sections.recommendArtists, data: artists},
      ]
    },100)
  };
}
