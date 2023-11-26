import { Component, Input, OnInit, Signal, computed, inject, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { LanguageService } from '../../../services/language.service';
import { PlayList } from '../../../model/domain/play-list';
import { map } from 'rxjs';
import { ContextMenuService } from '../../../services/context-menu.service';

@Component({
  selector: 'app-play-list-min-card',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './play-list-min-card.component.html',
  styleUrl: './play-list-min-card.component.scss',
})
export class PlayListMinCardComponent implements OnInit {
  languageS: LanguageService = inject(LanguageService);
  playList!: Signal<PlayList>;
  @Input({ required: true })
  set play(play: PlayList) {
    this.playList= computed(() => play);
  }
  dictionary!: any;

  constructor(private _contextMenu: ContextMenuService) {
    this.dictionary = this.languageS.diccionary
      .pipe(
        map((data: any) => {
          const { lang, components, ...rest } = data; //devolvemos diccionary.words
          this.dictionary = rest;
          return rest;
        })
      )
      .subscribe((data: any) => {
        return data;
      });
  }
  ngOnInit(): void {
  }

  newContextMenu(event: MouseEvent) {
    this._contextMenu.openDialog(event);
  }
}
