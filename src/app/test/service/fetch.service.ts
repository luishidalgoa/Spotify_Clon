import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FetchService {
  public credentials = {
    clientId: '72ea433aa55b4c71a3b7a8c082dbab57',
    clientSecret: 'fcb3200f35de457dbd966940b5f86893',
    accessToken:'',
  };
  //este objeto contiene las url de la api de spotify las cuales se usaran para hacer las peticiones a la a
  public poolURls = {
    authorize: `https://accounts.spotify.com/es-ES/authorize?client_id
    ${this.credentials.clientId}&response_type-token&redirect_uri=
    ${encodeURIComponent('http://localhost:4200/test/fetch')}&expires_in=3600`,
    refreshAccessToken: `https://accounts.spotify.com/api/token`,
  };

  constructor(private _http: HttpClient) {
    //this.upDateToken();
  }

  upDateToken() {
    this.credentials.accessToken = sessionStorage.getItem('token') || '';
  }
  //FUNCIONA
  getQuery(query: string) {
    console.log(this.credentials.accessToken);

    const URL = `https://api.spotify.com/v1/${query}`;
    const headers = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.credentials.accessToken,
      }),
    };

    return this._http.get(URL, headers);
  }
  /**
   * @description check if the token is valid or not and redirect to login if not valid
   */
  checkTokenSpoLogin() {
    this.checkTokenSpo() ||
      (sessionStorage.setItem('refererURL', location.href),
      (window.location.href = this.poolURls.authorize));
  }
  /**
   * this method check if the token is valid or not
   * @returns true if the token is not valid
   */
  checkTokenSpo() {
    return !this.credentials.accessToken;
  }
  /**
   * @description this method refresh the token
   */
  tokenRefreshURL() {
    this.checkTokenSpo() && alert('sesion expirada');

    this.credentials.accessToken = '';
    sessionStorage.removeItem('token');
    this.checkTokenSpoLogin();
  }
}
