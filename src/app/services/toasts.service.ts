import { Injectable, WritableSignal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastsService {
  items$: WritableSignal<[{ message: string; type?: boolean, style:string }] | []> = signal([]);

  constructor() { }

  async add(message: string, type: boolean=true): Promise<void> {
    return new Promise((resolve, reject) => {
      this.items$.update((items) => {
        const aux = items as [Toast];
        aux.push({message: message, type: type, style: 'start'});
        return aux;
      });
      this.destroyItem();
      resolve();
    });    
  }

  destroyItem(): void {
    setTimeout(() => {
      this.items$.update((items) => {
        const aux = items as [Toast];
        aux.splice(0, 1);
        return aux;
      });
    },3000)
  }

}


export interface Toast {
  message: string;
  type?: boolean;
  style:string;
}
