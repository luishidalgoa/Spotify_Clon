import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SlideMenuComponent } from './components/slide-menu/slide-menu.component';
import { TestComponent } from './test/pages/test.component';
import { AuthService } from './services/apis/Spotify/auth.service';
import { LanguageService } from './services/language.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,SlideMenuComponent,TestComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Spotify_LuisHidalgoA';
  constructor(private _auth: AuthService,private _language: LanguageService){}

  
}
