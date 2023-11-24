import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayListMinCardComponent } from '../../components/cards/play-list-min-card/play-list-min-card.component';
import { RouterLink, RouterOutlet } from '@angular/router';

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

}
