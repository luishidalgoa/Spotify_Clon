import { Component, HostListener, Input, Signal, computed, effect } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ContextMenuService } from '../../../services/context-menu.service';
import { PlayList } from '../../../model/domain/play-list';
import { Player } from '../../../model/domain/player';
import { PlayerService } from '../../../services/apis/Spotify/player.service';
import { ContextualmenuDirective } from '../../../directives/contextualmenu.directive';
import { ContextualMenuItem } from '../../../model/domain/contextual-menu-item';
import { ReduceData } from '../../../model/domain/api/spotify/reduce-data';

@Component({
  selector: 'app-medium-card',
  standalone: true,
  imports: [CommonModule,NgOptimizedImage,ContextualmenuDirective],
  templateUrl: './medium-card.component.html',
  styleUrl: './medium-card.component.scss'
})
export class MediumCardComponent {
  @Input({ required: true })
  value!: ReduceData;
  playerMedia!: Signal<Player>;
  

  playing: boolean = false;
  constructor(private _contextMenu: ContextMenuService,public _player: PlayerService) {
    this.playerMedia = computed(() => _player.currentPlaying$());
    effect(() => {
      if(this._player.currentPlaying$().context){
        this.playing =  this._player.currentPlaying$().context.uri === this.value.item.uri && this._player.currentPlaying$().is_playing;
      }else{
        this.playing = false;
      }
    });
  }



  ariaChecked:boolean = false;
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
    const offset = this.playerMedia().context.uri === this.value.item.uri?this.playerMedia().item.track_number:0
    const ms = this.playerMedia().context.uri === this.value.item.uri?this.playerMedia().progress_ms:0

    this._player.play(this.value.item.uri,offset,ms).then((result:boolean) => { //MODIFICAR cuando getPlaying se refactorize
      this.playing = result;
    })
  }

  contextMenuItem!: { style?: string; items: ContextualMenuItem[] };
  /**
   * Cuando el usuario haga click derecho sobre el elemento se va a ejecutar esta función. Le enviaremos a la directiva
   * un array de elementos que se mostraran en el menú contextual
   * @param event 
   */
  @HostListener('contextmenu', ['$event'])
  showContextMenu(event: MouseEvent): void {
    switch (this.value.item.type) {
      case 'playlist':
        this.contextMenuItem = this._contextMenu.createPlayListComponent(this.value);
        break;
      case 'artist':
        //this.contextMenuItem = this._contextMenu.createArtistComponent();
        break;
      case 'album':
        //this.contextMenuItem = this._contextMenu.createAlbumComponent();
        break;
      default:
        throw new Error('No se ha encontrado el tipo de elemento');
        break;
    }
  }
}
