import { Injectable, Signal, WritableSignal, effect, signal } from '@angular/core';
import { BehaviorSubject, Observable, of, pipe } from 'rxjs';
import { User } from '../../../model/domain/user';
import { AudiusUser } from '../../../model/domain/api/audius/user';
import { Router, RouterStateSnapshot } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
declare var window: any;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public backPath!: string | undefined;

  private credentials = {
    clientId: '72ea433aa55b4c71a3b7a8c082dbab57',
    clientSecret: 'fcb3200f35de457dbd966940b5f86893',
    transactionToken: '',
  };
  public accessToken$ = signal(sessionStorage.getItem('token') || '');

  constructor(private router: Router, private _http: HttpClient) {
    //extraemos el ultimo elemento code de la url si code no esta, estara vacio
    this.credentials.transactionToken =
      window.location.href.split('code=')[1] || '';
    if (this.credentials.transactionToken != '') {
      this.transactionToken();
    }

    effect(() => {
      if (this.accessToken$() != '') {
        sessionStorage.setItem('token', this.accessToken$());
      } else {
        sessionStorage.removeItem('token');
      }
    });
  }

  transactionToken(): void {
    const url = 'https://accounts.spotify.com/api/token';

    const body = new HttpParams()
      .set('code', this.credentials.transactionToken)
      .set('redirect_uri', `${environment.url}/Auth`)
      .set('grant_type', 'authorization_code');

    // Codifica el cliente ID y secreto en base64
    const authHeader = btoa(
      `${this.credentials.clientId}:${this.credentials.clientSecret}`
    );

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', `Basic ${authHeader}`);

    this._http.post(url, body, { headers: headers }).subscribe((data: any) => {
      console.log(data);
      //hacemos un sprite de los datos que nos devuelve la api. El unico que nos interesa es el token
      this.accessToken$.set(data.access_token);
    });
  }

  tokenRefresh(){
    
  }

  Auth(): void {
    const spotifyURL = `https://accounts.spotify.com/authorize?client_id=${this.credentials.clientId}&response_type=code&redirect_uri=${environment.url}/Auth`;
    window.location.href = spotifyURL;
    //extraemos el ultimo elemento de la url
  }

  singOut() {}
}
