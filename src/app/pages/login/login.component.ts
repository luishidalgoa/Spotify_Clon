import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { AuthService } from '../../services/apis/Spotify/auth.service';
import { SpotifyBigComponent } from '../../../assets/icons/spotify-big.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,SpotifyBigComponent,RouterModule,NgOptimizedImage],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(public authService: AuthService) {
    
  }

}
