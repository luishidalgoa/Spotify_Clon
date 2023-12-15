import { Component, Input, OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';
import { from, map } from 'rxjs';
import { PlayListService } from '../../services/apis/Spotify/play-list.service';
import { AuthService } from '../../services/apis/Spotify/auth.service';
import { PreviewComponent } from '../preview/preview.component';
import { EventType, Router, RouterEvent, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-central-wrapper',
  standalone: true,
  imports: [CommonModule,RouterOutlet,PreviewComponent],
  templateUrl: './central-wrapper.component.html',
  styleUrl: './central-wrapper.component.scss'
})
export class CentralWrapperComponent implements OnInit{
  public dictionary!: any;

  profilePicture!: string;


  routerHistory: RouterEvent[] = [];


  constructor(private _languege: LanguageService, private _playLists: PlayListService,public _auth: AuthService,private _router: Router) {
    effect(()=>{
      this.profilePicture = this._auth.currentUser$().images?.[0]?.url ?? '';
    })

    this.routesHistory();

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
  ngOnInit(): void {
    
  }

  routesHistory(){
    this._router.events.subscribe((event) => {
      if(event.type == EventType.NavigationEnd){
        this.routerHistory.push(event);
        console.log(this.routerHistory,'NAVIGATION');
      }
    });
  }

  back(){
    if(this.routerHistory.length > 1){
      this._router.navigateByUrl(this.routerHistory[this.routerHistory.length-2].url ?? '');
      this.routerHistory.pop();
    }
  }
}
