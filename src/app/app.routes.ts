import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TestComponent } from './pages/test/test.component';
import { PlayListMinCardComponent } from './components/cards/play-list-min-card/play-list-min-card.component';
import { SlideMenuComponent } from './components/slide-menu/slide-menu.component';
import { HubComponent } from './pages/hub/hub.component';
import { ApisComponent } from './pages/test/apis/apis.component';

export const routes: Routes = [
  { title:'Home | preview' ,path: 'home', component: AppComponent },

  // TEST
  { path: 'test', component: TestComponent },
  { path: 'test/PlayList-minCard', component: PlayListMinCardComponent },
  { path: 'test/slide-menu', component: HubComponent },
  { path: 'test/apis', component: ApisComponent},

  { path: '', redirectTo: 'test', pathMatch: 'full' },
  { path: '**', redirectTo: 'test' },
];
