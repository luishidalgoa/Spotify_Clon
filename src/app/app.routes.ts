import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TestComponent } from './test/pages/test.component';
import { PlayListMinCardComponent } from './components/cards/min-card/min-card.component';
import { SlideMenuComponent } from './components/slide-menu/slide-menu.component';
import { HubComponent } from './pages/hub/hub.component';
import { LoginComponent } from './pages/login/login.component';
import {SignalTestComponent} from "./test/pages/signal-test/signal-test.component";
import { authGuard } from './guards/auth.guard';
import { secondAuthGuard } from './guards/second-auth.guard';
import { ContextualMenuComponent } from './components/contextual-menu/contextual-menu.component';
import { PreviewComponent } from './pages/preview/preview.component';

export const routes: Routes = [
  {
    title: 'Spotify_Clon Project',
    path: '',loadComponent: () => import('./pages/hub/hub.component').then((m) => m.HubComponent),
    children: [
      {title: 'Home | preview',path:'',loadComponent: () => import('./pages/preview/preview.component').then((m) => m.PreviewComponent)},
      {path:'section/:title',loadComponent: () => import('./pages/section/show-more/show-more.component').then((m) => m.ShowMoreComponent)},
    ],
    canActivate: [authGuard]
  },
  { 
    title: 'Auth', path: 'Auth', loadComponent: () => import('./pages/login/login.component').then((m)=> m.LoginComponent), 
    canActivate: [secondAuthGuard] 
  },

  // TEST
  { path: 'test', component: TestComponent },
  { path: 'test/slide-menu', component: HubComponent },
  { path: 'test/signal', component: SignalTestComponent },
  {path: 'test/contextMenu', component: ContextualMenuComponent},

  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: 'test' },
];
