import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SyncViewService {
  private _sync: BehaviorSubject<void> = new BehaviorSubject<any>(null);

  constructor() {}


  /**
   * Getter sync este metodo es un observable que se puede suscribir para recibir notificaciones
   * @return {Observable<void>} 
   */
  public get sync():Observable<void> {
    return this._sync.asObservable();
  }
  public sendSync(){
      this._sync.next();
  }
}
