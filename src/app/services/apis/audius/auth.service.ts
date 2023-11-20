import { Injectable } from '@angular/core';
declare var window: any;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  
  async getToken(): Promise<Object> {
    return await window['getToken']();
  }
}
