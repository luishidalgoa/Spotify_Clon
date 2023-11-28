import { Component, Host, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent {
  @Input({ required: true })
  message!: string ;
  @Input({ required: true })
  type: boolean = true; // true = success, false = error
  constructor() {}
  

  /**
   * Creamos un metodo que bindee la clase start y espere 5 segundos. despues de eso agregara la clase end y esperara 1 segundo para eliminar el elemento
   */
  @HostBinding('class.start')
  start: boolean = false;
  @HostBinding('class.end')
  end: boolean = false;
  ngOnInit(): void {
    setTimeout(() => {
      this.start = true;
      setTimeout(() => {
        this.end = true;
        setTimeout(() => {
          this.end = false;
          this.start = false;
        }, 1000);
      }, 5000);
    }, 100);
  }
}
