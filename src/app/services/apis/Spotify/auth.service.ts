import { Injectable, WritableSignal, effect, signal } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { User } from '../../../model/domain/user';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
declare var window: any;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public backPath: string | undefined;
  private credentials = {
    clientId: environment.apis.spotify.clientId,
    clientSecret: environment.apis.spotify.clientSecret,
    transactionToken: '',
  };
  public currentUser$: WritableSignal<User> = signal({display_name: '',email: '',followers: {href: '',total: 0},href: '',id: '',images: [],product: '',type: ''});

  public token$: WritableSignal<{access_token: string,token_type?: string, expires_in?: string,refresh_token?: string}> = signal({access_token: sessionStorage.getItem('token') || '',token_type: sessionStorage.getItem('token_type')|| '', expires_in: sessionStorage.getItem('expires_in') || '',refresh_token: sessionStorage.getItem('refresh_token') || ''});

  constructor(private router: Router, private _http: HttpClient) {
    this.isAuth();
    setInterval(() => { //cada 60 segundos comprobamos si el token sigue siendo valido
      this.isAuth();
    }, 60000);

    //extraemos el ultimo elemento code de la url si code no esta, estara vacio
    this.credentials.transactionToken =
      window.location.href.split('code=')[1] || '';
    if (this.credentials.transactionToken != '') {
      this.transactionToken();
    }
    effect(() => {
      if (this.token$().access_token != '') { //si el token no esta vacio lo guardamos en el session storage
        sessionStorage.setItem('token', this.token$().access_token);
        sessionStorage.setItem('refresh_token', this.token$().refresh_token || '');
        sessionStorage.setItem('token_type', this.token$().token_type || '');
        sessionStorage.setItem('expires_in', this.token$().expires_in || '');

        this.tokenRefresh();
      } else {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('refresh_token');
        sessionStorage.removeItem('token_type');
        sessionStorage.removeItem('expires_in');
        this.router.navigateByUrl('Auth');
      }
    });
  }

  transactionToken(): void {
    const url = 'https://accounts.spotify.com/api/token';

    const body = new HttpParams()
      .set('code', this.credentials.transactionToken)
      .set('redirect_uri', `${environment.url}/Auth`)
      .set('grant_type', 'authorization_code');

    const authHeader = btoa(
      `${this.credentials.clientId}:${this.credentials.clientSecret}`
    );

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', `Basic ${authHeader}`);

    this._http.post(url, body, { headers: headers }).subscribe((data: any) => {
      //hacemos un sprite de los datos que nos devuelve la api. El unico que nos interesa es el token
      this.token$.set({access_token: data.access_token,token_type: data.token_type, expires_in: data.expires_in,refresh_token: data.refresh_token});
      this.credentials.transactionToken = '';
      this.router.navigateByUrl(localStorage.getItem('backPath') || '',{ skipLocationChange: true });
      localStorage.removeItem('backPath');
    });
  }

  tokenRefresh = () => {
    setInterval(() => {
      const url = 'https://accounts.spotify.com/api/token';
      const authHeader = btoa(
        `${this.credentials.clientId}:${this.credentials.clientSecret}`
      );
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', `Basic ${authHeader}`);

      const body = new HttpParams()
        .set('refresh_token', sessionStorage.getItem('refresh_token') || '')
        .set('grant_type', `refresh_token`)
        .set('client_id', '72ea433aa55b4c71a3b7a8c082dbab57');

      this._http
        .post(url, body, { headers: headers })
        .subscribe((data: any) => {
          this.token$.set({
            access_token: data.access_token,
            token_type: data.token_type,
            expires_in: data.expires_in,
            refresh_token: sessionStorage.getItem('refresh_token') || '',
          });
        });
    }, 2000000); 
  }

  Auth(): void {
    const scope= 'playlist-modify-public playlist-read-private playlist-modify-private user-read-currently-playing user-modify-playback-state user-read-playback-state user-follow-read user-top-read';
    const spotifyURL = `https://accounts.spotify.com/authorize?client_id=${this.credentials.clientId}&scope=${scope}&response_type=code&redirect_uri=${environment.url}/Auth`;
    window.location.href = spotifyURL;

  }

  singOut() {
    this.token$.set({access_token: '',token_type: '', expires_in: '',refresh_token: ''});
    this.router.navigateByUrl('Auth');
    this.currentUser$.set({display_name: '',email: '',followers: {href: '',total: 0},href: '',id: '',images: [],product: '',type: ''});
  }

  isAuth():void{
    const url = 'https://api.spotify.com/v1/me'
    const headers = new HttpHeaders()
        .set('Authorization', `Bearer ${sessionStorage.getItem('token')}`);
    this._http.get(url,{headers: headers}).pipe(
      tap((data:User | any)=>{
        this.currentUser$.set(data);
      }),
      catchError(error => {
        this.singOut();
        return throwError(error);
      })
    ).subscribe(()=>{
  
    });
  }
}