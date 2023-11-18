import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-play-list-min-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './play-list-min-card.component.html',
  styleUrl: './play-list-min-card.component.scss'
})
export class PlayListMinCardComponent {
  languageS: LanguageService= inject(LanguageService);
  
  constructor() { 
    
  }
}
