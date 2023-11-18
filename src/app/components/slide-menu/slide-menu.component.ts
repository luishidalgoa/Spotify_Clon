import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { HomeComponent } from '../../../assets/icons/home.component';
import { SearchComponent } from '../../../assets/icons/search.component';
import { LibraryComponent } from '../../../assets/icons/library.component';
import { AddComponent } from '../../../assets/icons/add.component';
import { HamburguerMenuComponent } from '../../../assets/icons/hamburguer-menu.component';
import { LanguageService } from '../../services/language.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-slide-menu',
  standalone: true,
  imports: [CommonModule, RouterLinkActive, RouterModule, RouterLink, HomeComponent, SearchComponent, LibraryComponent, AddComponent, HamburguerMenuComponent],
  templateUrl: './slide-menu.component.html',
  styleUrl: './slide-menu.component.scss'
})
export class SlideMenuComponent {
  tabIndex: number = -1;
  dictionary!: any;
  constructor(private languageService: LanguageService) {
    //Cargamos una parte del diccionario de idiomas que nos interesa
    languageService.diccionary
      .pipe(
        map((data: any) => {
          const { lang, components: { Slide_Menu }, ...rest } = data; //devolvemos diccionary.components.Slide_Menu
          this.dictionary=Slide_Menu;
        })
      )
      .subscribe((data: any) => { ; return data; });
  }
}
