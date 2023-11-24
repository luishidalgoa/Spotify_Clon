import { Signal, WritableSignal, computed, effect, inject, signal } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/apis/audius/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const _authService = inject(AuthService);
  const _router = inject(Router);
  let isAuthenticated = _authService.token$().access_token != '' ? true : false;
  effect(() => {
    isAuthenticated = _authService.token$().access_token != '' ? true : false;
  });

  if(!isAuthenticated){
    //Si no esta autenticado y no esta en la pagina de login, guardamos la ruta para redirigirle a ella
    localStorage.setItem('backPath', state.url);
    _router.navigate(['Auth']);
  }
  
  return isAuthenticated;
};
