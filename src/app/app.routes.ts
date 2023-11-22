import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TestComponent } from './test/pages/test.component';
import { PlayListMinCardComponent } from './components/cards/play-list-min-card/play-list-min-card.component';
import { SlideMenuComponent } from './components/slide-menu/slide-menu.component';
import { HubComponent } from './pages/hub/hub.component';
import { LoginComponent } from './pages/login/login.component';
import {SignalTestComponent} from "./test/pages/signal-test/signal-test.component";
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    title: 'Home | preview',
    path: '',loadComponent: () => import('./pages/hub/hub.component').then((m) => m.HubComponent),
    canActivate: [authGuard]
  },
  { title: 'Auth', path: 'Auth', component: LoginComponent },

  // TEST
  { path: 'test', component: TestComponent },
  {
    path: 'test/PlayList-minCard',
    loadComponent() {
      return import(
        './components/cards/play-list-min-card/play-list-min-card.component'
      ).then((m) => m.PlayListMinCardComponent);
    },
  },
  { path: 'test/slide-menu', component: HubComponent },
  { path: 'test/signal', component: SignalTestComponent },

  { path: '', redirectTo: 'test', pathMatch: 'full' },
  { path: '**', redirectTo: 'test' },
];
