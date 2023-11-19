import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { LanguageService } from '../../../services/language.service';
import { PlayList } from '../../../model/domain/play-list';
import { map } from 'rxjs';

@Component({
  selector: 'app-play-list-min-card',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './play-list-min-card.component.html',
  styleUrl: './play-list-min-card.component.scss',
})
export class PlayListMinCardComponent implements OnInit{
  languageS: LanguageService = inject(LanguageService);
  @Input({required: true})
  playList!: PlayList;
  dictionary!: any;

  constructor() {
    this.dictionary = this.languageS.diccionary.pipe(
     map((data: any) => {
        const {lang,components,...rest} = data; //devolvemos diccionary.words
        this.dictionary = rest;
        return rest;
     })
    ).subscribe((data: any) => {
      return data;
    });
  }
  ngOnInit(): void {
  }


}
