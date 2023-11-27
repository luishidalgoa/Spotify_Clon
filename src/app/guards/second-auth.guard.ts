import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/apis/Spotify/auth.service';

export const secondAuthGuard: CanActivateFn = (route, state) => {
  const _authService = inject(AuthService);
  const _router = inject(Router);
  if (_authService.token$().access_token != '' ) {
    _router.navigate(['']);
    return false;
  }
  return true;
};
