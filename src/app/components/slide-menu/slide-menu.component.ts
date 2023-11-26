import { Component, HostListener, OnInit, Signal, WritableSignal, computed, effect, inject, signal } from '@angular/core';
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
import { PlayListService } from '../../services/apis/Spotify/play-list.service';
import { ArtistService } from '../../services/apis/Spotify/artist.service';

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

  playLists: PlayList[]= [];

  constructor(private languageService: LanguageService,public _contextMenu: ContextMenuService, private _playLists: PlayListService,private _artist: ArtistService) {
    
    effect(()=>{
      this.playLists = this._playLists.playLists$();
    })
    //Cargamos una parte del diccionario de idiomas que nos interesa
    languageService.diccionary
      .pipe(
        map((data: any) => {
          const { lang,components: { Slide_Menu },...rest} = data; //devolvemos diccionary.components.Slide_Menu
          this.dictionary = Slide_Menu;
        })
      )
      .subscribe((data: any) => {
        return data;
      });
  }
  ngOnInit(): void {
  }

  newContextMenu(event: MouseEvent) {
    this._contextMenu.openDialog(event);
  }
}

