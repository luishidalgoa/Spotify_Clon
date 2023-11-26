import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { AuthService } from '../../services/apis/Spotify/auth.service';
import { SpotifyBigComponent } from '../../../assets/icons/spotify-big.component';
import { RouterModule } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, SpotifyBigComponent, RouterModule, NgOptimizedImage],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public dictionary!: any;

  constructor(
    public authService: AuthService,
    private _languege: LanguageService
  ) {
    _languege.diccionary
      .pipe(
        map((data: any) => {
          const { lang, components, words, contextMenu, ...rest } = data; //devolvemos diccionary.components.Slide_Menu
          return rest;
        })
      ).subscribe((data: any) => {
        this.dictionary = data;
        return data;
      });
  }
}
