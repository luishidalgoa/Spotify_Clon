import { Signal, WritableSignal, computed, effect, inject, signal } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/apis/Spotify/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const _authService = inject(AuthService);
  const _router = inject(Router);
  let isAuthenticated:boolean= _authService.token$().access_token != '' ;
  effect(() => {
    isAuthenticated = _authService.token$().access_token != '';
  });

  if(!isAuthenticated){
    //Si no esta autenticado y no esta en la pagina de login, guardamos la ruta para redirigirle a ella
    localStorage.setItem('backPath', state.url);
    _router.navigate(['Auth']);
  }else{
    _authService.isAuth()
  }
  
  return isAuthenticated;
};
