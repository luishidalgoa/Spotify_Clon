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
  public toasts$!: Signal<{ message: string; type?: boolean, style: string }[] | null>;

  constructor(private _toasts: ToastsService) {
    this.toasts$ = computed(() => this._toasts.items$());
  }

  ngAfterViewInit(): void {

  }

  @ViewChild('item') toastContainer!: ElementRef<HTMLDivElement>;
  ngOnInit(): void {
    
  }

  ngAfterViewChecked(): void {
  }
  
}
