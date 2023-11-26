import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';
import { map } from 'rxjs';
import { MediumCardComponent } from '../../medium-card/medium-card.component';
import { PlayList } from '../../model/domain/play-list';
import { PlayListService } from '../../services/apis/Spotify/play-list.service';

@Component({
  selector: 'app-central-wrapper',
  standalone: true,
  imports: [CommonModule,MediumCardComponent],
  templateUrl: './central-wrapper.component.html',
  styleUrl: './central-wrapper.component.scss'
})
export class CentralWrapperComponent implements OnInit{
  public dictionary!: any;
  welcome!: PlayList[];

  constructor(private _languege: LanguageService, private _playLists: PlayListService) {
    _languege.diccionary
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
    this._playLists.getUserPlayLists().subscribe((data: any) => {
      this.welcome = data.items;
    })
  }
}
