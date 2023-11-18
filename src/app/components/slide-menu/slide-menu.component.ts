import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../../icons/home.component';
import { SearchComponent } from '../../icons/search.component';
import { LibraryComponent } from '../../icons/library.component';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { AddComponent } from '../../icons/add.component';
import { HamburguerMenuComponent } from '../../icons/hamburguer-menu.component';

@Component({
  selector: 'app-slide-menu',
  standalone: true,
  imports: [CommonModule,HomeComponent,SearchComponent,LibraryComponent,RouterLinkActive,RouterModule,RouterLink,AddComponent,HamburguerMenuComponent],
  templateUrl: './slide-menu.component.html',
  styleUrl: './slide-menu.component.scss'
})
export class SlideMenuComponent {
  tabIndex:number=-1;

  miMetodo() {
    console.log("Click en el boton");
  }
}
