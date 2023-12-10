import { Component, HostListener, Input, Signal, computed, effect } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ContextMenuService } from '../../../services/context-menu.service';
import { PlayList } from '../../../model/domain/play-list';
import { Player } from '../../../model/domain/player';
import { PlayerService } from '../../../services/apis/Spotify/player.service';

@Component({
  selector: 'app-medium-card',
  standalone: true,
  imports: [CommonModule,NgOptimizedImage,],
  templateUrl: './medium-card.component.html',
  styleUrl: './medium-card.component.scss'
})
export class MediumCardComponent {
  @Input({ required: true })
  value!: PlayList;
  playerMedia!: Signal<Player>;
  

  playing: boolean = false;
  constructor(private _contextMenu: ContextMenuService,public _player: PlayerService) {
    this.playerMedia = computed(() => _player.currentPlaying$());
    effect(() => {
      if(this._player.currentPlaying$().context){
        this.playing =  this._player.currentPlaying$().context.href === this.value.href && this._player.currentPlaying$().is_playing;
      }else{
        this.playing = false;
      }
    });
  }



  ariaChecked:boolean = false;
  newContextMenu(event: MouseEvent) {
    this._contextMenu.openDialog(event);
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

  play():void{ //NOTAAAAAAAAAAA Esto debemos pasarle a play un objeto con su uri, offeset y ms y que el metodo play se encargue de todo
    const offset = this.playerMedia().context.href === this.value.href?this.playerMedia().item.track_number:0
    const ms = this.playerMedia().context.href === this.value.href?this.playerMedia().progress_ms:0

    this._player.play(this.value.uri,offset,ms).then((result:boolean) => { //MODIFICAR cuando getPlaying se refactorize
      this.playing = result;
    })
  }

}
