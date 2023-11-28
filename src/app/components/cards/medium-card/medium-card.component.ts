import { Component, Input, Signal, computed, effect } from '@angular/core';
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
  player!: Signal<Player>;


  playing: boolean = false;
  constructor(private _contextMenu: ContextMenuService,public _player: PlayerService) {
    this.player = computed(() => _player.currentPlaying$());
    effect(() => {
      this.playing =  this.player().context.href === this.value.href && this.player().is_playing;
    });
  }



  ariaChecked:boolean = false;
  newContextMenu(event: MouseEvent) {
    this._contextMenu.openDialog(event);
  }
}
