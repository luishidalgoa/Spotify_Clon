import { Signal, WritableSignal, computed, effect, inject, signal } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/apis/audius/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const _authService = inject(AuthService);
  const _router = inject(Router);
  let isAuthenticated = sessionStorage.getItem('token') != null ? true : false;
  effect(() => {
    isAuthenticated = sessionStorage.getItem('token') != null ? true : false;
  });


  if(!isAuthenticated){
    //Si no esta autenticado y no esta en la pagina de login, guardamos la ruta para redirigirle a ella
    if (state.url[0].toString() != 'login') {
      _authService.backPath = state.url[0].toString();
      _router.navigate(['/Auth']);
    }
  }
  
  return isAuthenticated;
};
