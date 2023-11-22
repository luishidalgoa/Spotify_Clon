import { Injectable, Signal, WritableSignal, signal } from '@angular/core';
import { Observable, of, pipe } from 'rxjs';
import { User } from '../../../model/domain/user';
import { AudiusUser } from '../../../model/domain/api/audius/user';
import { Router } from '@angular/router';
declare var window: any;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser: WritableSignal<User>= signal({name:''});
  public backPath!: string | undefined;

  constructor(private router: Router) {
  }

  async getToken(): Promise<Object> {
    return await window['getToken']();
  }

  Auth(): void {
    this.getToken().then((sdk: any) => {
      sdk.oauth.init({
        successCallback: async (user: any) => {
          this.currentUser.set({
            id: user.userId,
            email: user.email,
            name: user.name,
            nickName: user.handle,
            picture: {
              _150x150: user.profilePicture._150x150,
              _480x480: user.profilePicture._480x480,
              _1000x1000: user.profilePicture._1000x1000,
            },
          });

          if(this.backPath != undefined)
            this.router.navigateByUrl(this.backPath?.toString());

          this.backPath = undefined;
        },
        errorCallback: (error: any) => {
          if(this.currentUser().name!=''){
            console.log('Se cerro sesion correctamente')
          }else{
            console.log('Got error', error);
          }
           this.currentUser.set({name:''})
          },
      });
      // Login with write scope nos permite hacer acciones en nombre del usuario por ejemplo subir canciones
      sdk.oauth.login({
        scope: 'write',
      });
    });
  }

  singOut() {
    
  }

  getcurrentUser(): User {
    return this.currentUser();
  }
}


