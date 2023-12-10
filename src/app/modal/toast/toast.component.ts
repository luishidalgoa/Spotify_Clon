import { AfterViewInit, Component, ElementRef, Input, Signal, ViewChild, computed, effect, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastsService } from '../../services/toasts.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent implements AfterViewInit {
  public toasts$!: Signal<[{ message: string; type?: boolean, style:string }]| []>;
item$: any;

  constructor(private _toasts: ToastsService) {
    this.toasts$ = computed(() => this._toasts.items$());
    effect(() => {
      console.log(this.toasts$());
      this.item$ = this.toasts$();
    })
  }

  @ViewChild('item') toastContainer!: ElementRef<HTMLDivElement>;
  ngOnInit(): void {
    
  }


  @ViewChild('container') container!: ElementRef;
  ngAfterViewInit(): void {
    const observer = new MutationObserver(() => {
        this.destroyItem();
    });
    // Comienza a observar el nodo de destino para cuando mute su contenido (agregue o elimine nodos)
    observer.observe(this.container.nativeElement, { childList: true });
  }
  
  destroyItem() {
    const index= this.container.nativeElement.children.length-1;
    setTimeout(() => {
      this.container.nativeElement.children[index].classList.add('end');
    },2500)
  }
}
