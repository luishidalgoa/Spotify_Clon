import { Signal, WritableSignal, computed, effect, inject, signal } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/apis/audius/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  let isAuthenticated = authService.getcurrentUser().name != '';


  if(!isAuthenticated){
    //Si no esta autenticado y no esta en la pagina de login, guardamos la ruta para redirigirle a ella
    if (state.url[0].toString() != 'login') {
      authService.backPath = state.url[0].toString();
      router.navigate(['/Auth']);
    }
  }
  
  return isAuthenticated;
};
