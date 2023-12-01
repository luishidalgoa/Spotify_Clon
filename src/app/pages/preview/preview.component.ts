import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediumCardComponent } from '../../components/cards/medium-card/medium-card.component';
import { PlayList } from '../../model/domain/play-list';
import { PlayListService } from '../../services/apis/Spotify/play-list.service';
import { LanguageService } from '../../services/language.service';
import { map } from 'rxjs';
import { BigCardComponent } from '../../components/cards/big-card/big-card.component';

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [CommonModule,MediumCardComponent,BigCardComponent],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.scss'
})
export class PreviewComponent {
  welcome!: PlayList[];
  dictionary!: any;

  constructor(private _playLists:PlayListService,private _language: LanguageService) { 
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
}
