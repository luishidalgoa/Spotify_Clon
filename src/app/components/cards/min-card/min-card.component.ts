import { Component, Input, OnInit, Signal, computed, inject, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { LanguageService } from '../../../services/language.service';
import { PlayList } from '../../../model/domain/play-list';
import { map } from 'rxjs';
import { ContextMenuService } from '../../../services/context-menu.service';
import { Artist } from '../../../model/domain/artist';
import { CapitalizeFirstPipe } from '../../../Pipes/capitalize-first.pipe';
import { PlayerService } from '../../../services/apis/Spotify/player.service';

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
  object!: PlayList | Artist | any;
  dictionary: any;

  data!: {
    title: string;
    description: string;
    image: string;
    uri: string;
    type: string;
    id: string;
  }
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
    if(this.object.type === 'artist'){
      this.data = {
        title: this.object.name,
        description: '',
        image: this.object.images[3].url,
        uri: this.object.uri,
        type: this.object.type,
        id: this.object.id,
      }
    }else if(this.object.type === 'playlist'){
      const aux= this.object as PlayList;
      this.data = {
        title: aux.name,
        description: aux.description,
        image: aux.images?.[0].url ?? '',
        uri: aux.uri,
        type: aux.type,
        id: aux.id,
      }
    }

  }

  newContextMenu(event: MouseEvent) {
    this._contextMenu.openDialog(event);
  }
}
