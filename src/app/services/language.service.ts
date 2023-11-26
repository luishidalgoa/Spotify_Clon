import { Injectable, inject } from '@angular/core';
import { language } from '../model/enum/language';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private language: string = language.Spanish;
  //extraemos el json del idioma seleccionado
  public diccionary!: Observable<any>;
  
  constructor(private http: HttpClient) {
    this.setLanguage(this.language);
  }

  public getLanguage(): string {
    return this.language;
  }
  public setLanguage(language: string):Observable<any> { 
    this.language = language;
    return this.diccionary = this.http.get(`../../assets/i18n/${this.language}.json`);
  }
}
