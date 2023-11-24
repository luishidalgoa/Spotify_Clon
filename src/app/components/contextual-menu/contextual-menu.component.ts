import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { contextualMenuItemComponent } from './item/item.component';

@Component({
  selector: 'app-contextual-menu',
  standalone: true,
  imports: [CommonModule,contextualMenuItemComponent],
  templateUrl: './contextual-menu.component.html',
  styleUrl: './contextual-menu.component.scss'
})
export class ContextualMenuComponent {

}
