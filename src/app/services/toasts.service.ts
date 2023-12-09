import { Injectable, WritableSignal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastsService {
  items$: WritableSignal<{ message: string; type?: boolean, style:string }[] | null> = signal(null);

  constructor() { }

  async add(message: string, type: boolean=true): Promise<void> {
    await this.initialize().then(() => {
      this.items$.update((items) => {
        const aux = items as Toast[];
        aux.push({ message, type, style:'start' });
        //automatizamos la destrucción del toast pasados 3 segundos
        this.destroyItem()
        return aux;
      });
    });
    
  }


  initialize(): Promise<void>{
    return new Promise((resolve, reject) => {
      if(this.items$() === null){
        this.items$.set([]);
      }
      resolve();
    });
  }

  destroyItem(): void {
    setTimeout(() => {
      this.items$.update((items) => {
        const aux = items as Toast[];
        aux[0].style = 'end';
        return aux;
      });
    },2500)
    setTimeout(() => {
      this.items$.update((items) => {
        const aux = items as Toast[];
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
