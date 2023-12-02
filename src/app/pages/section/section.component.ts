import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BigCardComponent } from '../../components/cards/big-card/big-card.component';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [CommonModule,BigCardComponent],
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss'
})
export class SectionComponent {
  @Input({required: true}) 
  value!: any;

  constructor() { 
  }
  
  ngOnInit(): void {
  }
}
