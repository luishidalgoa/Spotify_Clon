import {Injectable, OnInit, signal, WritableSignal} from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalService{
  variable$: WritableSignal<number> = signal(0);
  constructor() { 

    setTimeout(() => {
      this.variable$.update(() => 5);
      console.log('variable$ updated', this.variable$());
    }, 1000);
  }
}
