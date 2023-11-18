import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TestComponent } from './pages/test/test.component';
import { PlayListMinCardComponent } from './components/cards/play-list-min-card/play-list-min-card.component';
import { SlideMenuComponent } from './components/slide-menu/slide-menu.component';
import { HubComponent } from './pages/hub/hub.component';

export const routes: Routes = [
  { path: 'home', component: AppComponent },

  // TEST
  { path: 'test', component: TestComponent },
  { path: 'test/PlayList-minCard', component: PlayListMinCardComponent },
  { path: 'test/slide-menu', component: HubComponent },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];
