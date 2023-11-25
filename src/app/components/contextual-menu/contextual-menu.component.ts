import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { contextualMenuItemComponent } from './item/item.component';
import { CircleCheckComponent } from '../../../assets/icons/circle-check.component';
import { ContextualItemType } from '../../model/enum/contextual-item-type';
import { ContextualMenuItem } from '../../model/domain/contextual-menu-item';

@Component({
  selector: 'app-contextual-menu',
  standalone: true,
  imports: [CommonModule, contextualMenuItemComponent, CircleCheckComponent],
  templateUrl: './contextual-menu.component.html',
  styleUrl: './contextual-menu.component.scss',
})
export class ContextualMenuComponent {
  @Input({ required: true })
  items: ContextualMenuItem[] = [];

  constructor() {}

  addItem(item: ContextualMenuItem) {
    this.items.push(item);
  }
}
