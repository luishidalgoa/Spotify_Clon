import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-central-wrapper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './central-wrapper.component.html',
  styleUrl: './central-wrapper.component.scss'
})
export class CentralWrapperComponent {
  public dictionary!: any;
  constructor(private _languege: LanguageService) {
    _languege.diccionary
      .pipe(
        map((data: any) => {
          const { lang, components, login, ...rest } = data; //devolvemos diccionary.components.Slide_Menu
          return rest;
        })
      ).subscribe((data: any) => {
        this.dictionary = data;
        return data;
      });
  }
}
