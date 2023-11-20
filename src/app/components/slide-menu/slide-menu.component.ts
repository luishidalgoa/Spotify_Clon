import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { HomeComponent } from '../../../assets/icons/home.component';
import { SearchComponent } from '../../../assets/icons/search.component';
import { LibraryComponent } from '../../../assets/icons/library.component';
import { AddComponent } from '../../../assets/icons/add.component';
import { HamburguerMenuComponent } from '../../../assets/icons/hamburguer-menu.component';
import { LanguageService } from '../../services/language.service';
import { Observable, map } from 'rxjs';
import { PlayListMinCardComponent } from '../cards/play-list-min-card/play-list-min-card.component';
import { PlayList } from '../../model/domain/play-list';
import {HttpClient} from "@angular/common/http";
import { skeletonPlayListMinCardComponent } from '../items/skeleton/play-list-min-card/play-list-min-card.component';

@Component({
  selector: 'app-slide-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterLinkActive,
    RouterModule,
    RouterLink,
    HomeComponent,
    SearchComponent,
    LibraryComponent,
    AddComponent,
    HamburguerMenuComponent,
    PlayListMinCardComponent,
    NgOptimizedImage,skeletonPlayListMinCardComponent
  ],
  templateUrl: './slide-menu.component.html',
  styleUrl: './slide-menu.component.scss',
})
export class SlideMenuComponent implements OnInit {
  tabIndex: number = -1;
  dictionary!: any;
  public playLists!: PlayList[];

  constructor(private languageService: LanguageService) {
    //Cargamos una parte del diccionario de idiomas que nos interesa
    languageService.diccionary
      .pipe(
        map((data: any) => {
          const {
            lang,
            components: { Slide_Menu },
            ...rest
          } = data; //devolvemos diccionary.components.Slide_Menu
          this.dictionary = Slide_Menu;
        })
      )
      .subscribe((data: any) => {
        return data;
      });
  }
  ngOnInit(): void {
    this.playLists = [
      {
        id: 1,
        name: 'Musicote',
        picture:
          'https://i.scdn.co/image/ab67706c0000da84a150ef2143685e190d354439',
        owner:{
          name: 'Luiss_perezh',
        }
      },
      {
        id: 2,
        name: 'Favoritos',
        picture:
          'https://wallup.net/wp-content/uploads/2018/10/04/670065-space-outer-universe-stars-photography-detail-astronomy-nasa-hubble.jpg',
        owner: {
          name: 'Luis Hidalgo Aguilar',
        },
      }
    ];
    /*this.fakeImage().subscribe((data: any) => {
      for (let i = 0; i < 30; i++) {
        {
          this.playLists.push({
            id: i,
            name: 'Musicote',
            picture: data[i].images[0],
            owner: {
              name: 'Luiss_perezh',
            },
          });
        }
      }
    });*/

  }

  /*http: HttpClient = inject(HttpClient);
  fakeImage(): Observable<object> {
    return this.http.get('https://api.escuelajs.co/api/v1/products');
  }*/
}
