import { Component, HostListener, OnInit, Signal, WritableSignal, inject, signal } from '@angular/core';
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
import { ContextualMenuComponent } from '../contextual-menu/contextual-menu.component';
import { ContextualMenuItem } from '../../model/domain/contextual-menu-item';
import { ContextMenuService } from '../../services/context-menu.service';

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
    NgOptimizedImage,
    skeletonPlayListMinCardComponent,
    ContextualMenuComponent,
  ],
  templateUrl: './slide-menu.component.html',
  styleUrl: './slide-menu.component.scss',
})
export class SlideMenuComponent implements OnInit {
  @HostListener('document:contextmenu', ['$event'])
  onRightClick(event: Event): void {
    event.preventDefault(); // Evita que aparezca el menú contextual
  }

  tabIndex: number = -1;
  dictionary!: any;
  public playLists!: WritableSignal<PlayList[]>;

  constructor(
    private languageService: LanguageService,
    public _contextMenu: ContextMenuService
  ) {
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
    //le asignamos al signal los elementos. Apartir de ahora el signal se actualizara cada vez que se actualice el array
    this.playLists = signal([
      {
        id: 1,
        name: 'Musicote',
        picture:
          'https://i.scdn.co/image/ab67706c0000da84a150ef2143685e190d354439',
        owner: {
          name: 'Luiss_perezh',
        },
      },
      {
        id: 2,
        name: 'Favoritos',
        picture:
          'https://wallup.net/wp-content/uploads/2018/10/04/670065-space-outer-universe-stars-photography-detail-astronomy-nasa-hubble.jpg',
        owner: {
          name: 'Luis Hidalgo Aguilar',
        },
      },
    ]);

    setTimeout(() => {
      this.playLists().push({
        id: 3,
        name: 'Musicote2',
        picture:
          'https://i.scdn.co/image/ab67706c0000da84a150ef2143685e190d354439',
        owner: {
          name: 'Luiss_perezh',
        },
      });
      //actualizamos algun elemento del array para comprobar la reactividad con el componente playListMinCard
      this.playLists.update((data: PlayList[]): any => {
        //devolvemos un array con el elemento con id 1 actualizado
        return data.map((item: PlayList) => {
          if (item.id === 1) {
            return {
              ...item,
              name: 'Musicote3',
            };
          }
          return item;
        });
      });
      console.log('playLists updated', this.playLists());
    }, 5000);
  }

  newContextMenu(event: MouseEvent) {
    this._contextMenu.openDialog(event);
  }
}
