import { Injectable, inject } from '@angular/core';
import { language } from '../model/enum/language';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private language: string = language.Spanish;
  //extraemos el json del idioma seleccionado
  public diccionary: ReplaySubject<any>= new ReplaySubject<any>(1);
  
  constructor(private http: HttpClient) {
    this.setLanguage(this.language);
  }

  public getLanguage(): string {
    return this.language;
  }
  public setLanguage(language: string):void {
    this.language = language;
    this.http.get(`./assets/i18n/${this.language}.json`).subscribe((data: any) => {
      this.diccionary.next(data);
    });
  }
}
