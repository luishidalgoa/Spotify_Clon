import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { ContextualMenuItem } from '../model/domain/contextual-menu-item';
import { ContextualItemType } from '../model/enum/contextual-item-type';
import { sign } from 'web3/lib/commonjs/eth.exports';
import { LanguageService } from './language.service';
import { map } from 'rxjs';
import { PlayListService } from './apis/Spotify/play-list.service';
import { PlayList } from '../model/domain/play-list';
import { DataWrapperService } from './apis/Spotify/data-wrapper.service';
import { ReduceData } from '../model/domain/api/spotify/reduce-data';

@Injectable({
  providedIn: 'root',
})
export class ContextMenuService {
  contextMenu$: WritableSignal<{
    style?: string;
    items: ContextualMenuItem[];
  }> = signal({ items: [] });
  event!: MouseEvent;

  dictionary!: any;
  constructor(private _language: LanguageService) {
    _language.getDiccionary
      .pipe(
        map((data: any) => {
          const { lang, components, words, privacity, login, ...rest } = data; //devolvemos diccionary.components.Slide_Menu
          return rest;
        })
      )
      .subscribe((data: any) => {
        this.dictionary = data.contextMenu;
        return data;
      });
  }

  async openDialog(items: ContextualMenuItem[],event: MouseEvent): Promise<void> {
   this.contextMenu$.set(
      {
        style: this.calculatePosition(event),
        items: items,
      }
   )
  }
  /**
   * Vamos hacer un calculo de la posición del ratón para que el menú contextual se muestre en la posición correcta
   * y no se salga de la pantalla
   * @param event
   * @return devolveremos un estilo css con la posición del menú contextual
   */
  calculatePosition(event: any): string {
    let x = event.clientX;
    let y = event.clientY;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let menuWidth = 250;
    let menuHeight = 250;
    let xPosition = x + menuWidth > width ? x - menuWidth : x;
    let yPosition = y + menuHeight > height ? y - menuHeight : y;
    return `left:${xPosition}px;top:${yPosition}px;`;
  }

  close(): void {
    this.contextMenu$.set({ items: [] });
  }

  createPlayListComponent(item: ReduceData): { style?: string; items: ContextualMenuItem[] } {
    return {items:[]}
  }


  _playlistService: PlayListService = inject(PlayListService);
  _dataWrapper: DataWrapperService = inject(DataWrapperService);
  generateAddPlayListItems(): ContextualMenuItem[] {
    return [
      {
        svg: [
          {
            icon: `<svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" class="Svg-sc-ytk21e-0 dCszzJ"><path d="M2 0v2H0v1.5h2v2h1.5v-2h2V2h-2V0H2zm11.5 2.5H8.244A5.482 5.482 0 0 0 7.966 1H15v11.75A2.75 2.75 0 1 1 12.25 10h1.25V2.5zm0 9h-1.25a1.25 1.25 0 1 0 1.25 1.25V11.5zM4 8.107a5.465 5.465 0 0 0 1.5-.593v5.236A2.75 2.75 0 1 1 2.75 10H4V8.107zM4 11.5H2.75A1.25 1.25 0 1 0 4 12.75V11.5z"></path></svg>`,
          },
        ],
        title: this.dictionary.add.createList,
        callback:async  () => {
          const number = (await this._playlistService.getOnlyUserPlayLists()).length
          this._playlistService.createPlayList(`My list n.º${number}`, '', false).subscribe((data: PlayList) => {
            this._dataWrapper._dataWrapper$.update(value => [this._dataWrapper.convertPlayListToDataWrapper(data),...value]);
          });

          this.close()
        },
      },
      {
        svg: [
          {
            icon: '<svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" class="Svg-sc-ytk21e-0 dCszzJ"><path d="M15.25 8a.75.75 0 0 1-.75.75H8.75v5.75a.75.75 0 0 1-1.5 0V8.75H1.5a.75.75 0 0 1 0-1.5h5.75V1.5a.75.75 0 0 1 1.5 0v5.75h5.75a.75.75 0 0 1 .75.75z"></path></svg>',
          },
        ],
        title: this.dictionary.add.createFolder,
        callback:async  () => {
          const number = (await this._playlistService.getOnlyUserPlayLists()).length
          this._playlistService.createPlayList(`My list n.º${number}`, '', false).subscribe((data: PlayList) => {
            this._dataWrapper._dataWrapper$.update(value => [this._dataWrapper.convertPlayListToDataWrapper(data),...value]);
          });

          this.close()
        },
      },
    ];
  }

}
