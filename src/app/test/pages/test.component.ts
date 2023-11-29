import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayListMinCardComponent } from '../../components/cards/min-card/min-card.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PlayerService } from '../../services/apis/Spotify/player.service';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule,PlayListMinCardComponent,RouterLink,RouterOutlet],
  templateUrl: './test.component.html',
  styles: `
  button{
    background-color: #1db954;
    border-radius: 50%;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 24px;
    margin: 4px 2px;
    cursor: pointer;
  }
  `
})
export class TestComponent {
  constructor(private _player: PlayerService) {
    console.log(this._player);
    this._player.getPlayingInterval().subscribe((data: any) => {
      console.log(data);
    });
  }

}
