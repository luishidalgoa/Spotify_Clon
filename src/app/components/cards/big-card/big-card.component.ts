import { Component, Input, Signal, computed, effect } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ReduceData } from '../../../model/domain/api/spotify/reduce-data';
import { Player } from '../../../model/domain/player';
import { PlayerService } from '../../../services/apis/Spotify/player.service';
import { LanguageService } from '../../../services/language.service';
import { map } from 'rxjs';
import { ContextualmenuDirective } from '../../../directives/contextualmenu.directive';
import { ContextualMenuItem } from '../../../model/domain/contextual-menu-item';
import { ContextMenuService } from '../../../services/context-menu.service';

@Component({
  selector: 'app-big-card',
  standalone: true,
  imports: [CommonModule,NgOptimizedImage, ContextualmenuDirective],
  templateUrl: './big-card.component.html',
  styleUrl: './big-card.component.scss'
})
export class BigCardComponent {
  @Input({required: true})
  object!: ReduceData;
  
  dictionary: any;
  ariaChecked:boolean = false;

  playerMedia!: Signal<Player>;

  playing: boolean = false;

  constructor(private _player:PlayerService,private languageS: LanguageService,private _contextMenu: ContextMenuService){
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

    this.playerMedia = computed(() => _player.currentPlaying$());
    effect(() => {
      if(this._player.currentPlaying$().context){
        this.playing =  this._player.currentPlaying$().context.uri === this.object.item.uri && this._player.currentPlaying$().is_playing;
      }else{
        this.playing = false;
      }
    });
  }

  play():void{//MODIFICAR cuando getPlayingInterval() se actualize
    const offset = this.playerMedia().context.uri === this.object.item.uri?this.playerMedia().item.track_number:0
    const ms = this.playerMedia().context.uri === this.object.item.uri?this.playerMedia().progress_ms:0

    this._player.play(this.object.item.uri,offset,ms).then((result:boolean) => {
      this.playing = result;
    })
  }

  /**
   * Cuando se clicke sobre el elemento se va a ejecutar esta función
   * se comprobara si la playlist actual esta sonando o no
   * si lo esta se pausara y si no deberia de reproducirse. Sin embargo
   * no parece ser posible con la Api de Spotify
   * @param event 
   */
  handleClick(event:MouseEvent):void{
    if(this.playing){
      try{
        this._player.pauseTrack().then((result:boolean) => {
            this.playing = !result; // sera lo contrario de lo que ocurra. es decir si se pauso pauseTrack() devuelve true y lo convertimos en false
        }).catch((err) => {
          return err;
        });
      }catch(err){
        console.log("No se pudo parar",err)
      }
    }else{
      this.play()
    }
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
