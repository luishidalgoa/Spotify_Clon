import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SyncViewService {
  private _sync: BehaviorSubject<void> = new BehaviorSubject<any>(null);

  constructor() {
    this._sync = new BehaviorSubject<any>(null);
   }

  public get sync() {
    return this._sync.asObservable();
  }
  public sendSync(){
      this._sync?.next();
  }
}
