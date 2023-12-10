import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BigCardComponent } from '../../components/cards/big-card/big-card.component';
import { ReduceData } from '../../model/domain/api/spotify/reduce-data';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [CommonModule,BigCardComponent],
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss'
})
export class SectionComponent {
  @Input({required: true}) 
  items!: {title: string, data?: ReduceData[]};

  wrapper!: ReduceData[];
  

  constructor() { 
  }
  
  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.onResize(null);
    }, 100);
  }

  @ViewChild('container') 
  container!: ElementRef;
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    const cols = Math.floor(this.container.nativeElement.offsetWidth / 190);
    this.wrapper = [];

    this.items.data?.forEach((item: ReduceData, index: number) => {
      if(index < cols){
        this.wrapper.push(item);
      }
    });
  }
}
