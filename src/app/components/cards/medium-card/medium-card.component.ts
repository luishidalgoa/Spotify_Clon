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
      this.playing =  this.playerMedia().context.href === this.value.href && this.playerMedia().is_playing;
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
    if(this.value.href !== this.playerMedia().context.href)return;
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
      this._player.playAlbum(this.playerMedia().context.href ?? '',this.playerMedia().item.track_number,this.playerMedia().progress_ms).then((result:boolean) => {
        this.playing = result;
      }).catch((err) => {
        console.log(err)
      });;
    }
  }
}
