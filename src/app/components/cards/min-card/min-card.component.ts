import { Component, Input, OnInit, Signal, computed, inject, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { LanguageService } from '../../../services/language.service';
import { PlayList } from '../../../model/domain/play-list';
import { map } from 'rxjs';
import { ContextMenuService } from '../../../services/context-menu.service';
import { Artist } from '../../../model/domain/artist';
import { CapitalizeFirstPipe } from '../../../Pipes/capitalize-first.pipe';
import { PlayerService } from '../../../services/apis/Spotify/player.service';
import { User } from '../../../model/domain/user';
import { ReduceData } from '../../../model/domain/api/spotify/reduce-data';

@Component({
  selector: 'app-min-card',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage,CapitalizeFirstPipe],
  templateUrl: './min-card.component.html',
  styleUrl: './min-card.component.scss',
})
export class PlayListMinCardComponent implements OnInit {
  languageS: LanguageService = inject(LanguageService);
  @Input({ required: true })
  object!: ReduceData;
  dictionary: any;

  constructor(private _contextMenu: ContextMenuService,private _player: PlayerService) {
    this.languageS.diccionary
      .pipe(
        map((data: any) => {;
          const { lang, components, ...rest } = data; //devolvemos diccionary.words
          this.dictionary = rest;
          return rest;
        })
      )
      .subscribe((data: any) => {
        this.dictionary = data;
        return data;
      });
  }
  ngOnInit(): void {

  }

  newContextMenu(event: MouseEvent) {
    this._contextMenu.openDialog(event);
  }
}
