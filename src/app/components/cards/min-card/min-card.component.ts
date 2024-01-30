import { Component, Input, OnInit, Signal, computed, inject, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { LanguageService } from '../../../services/language.service';
import { PlayList } from '../../../model/domain/play-list';
import { map } from 'rxjs';
import { ContextMenuService } from '../../../services/context-menu.service';
import { Artist } from '../../../model/domain/artist';
import { PlayerService } from '../../../services/apis/Spotify/player.service';
import { User } from '../../../model/domain/user';
import { ReduceData } from '../../../model/domain/api/spotify/reduce-data';
import { GetDisplayNamePipe } from '../../../pipes/get-display-name.pipe';
import { ContextualmenuDirective } from '../../../directives/contextualmenu.directive';
import { ContextualMenuItem } from '../../../model/domain/contextual-menu-item';

@Component({
  selector: 'app-min-card',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, GetDisplayNamePipe,ContextualmenuDirective],
  templateUrl: './min-card.component.html',
  styleUrl: './min-card.component.scss',
})
export class PlayListMinCardComponent implements OnInit {
  languageS: LanguageService = inject(LanguageService);
  @Input({ required: true })
  object!: ReduceData;
  dictionary: any;

  constructor(public _contextMenu: ContextMenuService,private _player: PlayerService) {
    this.languageS.getDiccionary
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

  context(): ContextualMenuItem[]{
    return [
      {
        svg: [
          {
            icon: `<svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" class="Svg-sc-ytk21e-0 dCszzJ"><path d="M16 15H2v-1.5h14V15zm0-4.5H2V9h14v1.5zm-8.034-6A5.484 5.484 0 0 1 7.187 6H13.5a2.5 2.5 0 0 0 0-5H7.966c.159.474.255.978.278 1.5H13.5a1 1 0 1 1 0 2H7.966zM2 2V0h1.5v2h2v1.5h-2v2H2v-2H0V2h2z"></path></svg>`,
          },
        ],
        title: this.dictionary.contextMenu.playList.addTail,
        callback:async  () => {
          this._contextMenu.close()
        },
      },
      
    ];
  }

}
