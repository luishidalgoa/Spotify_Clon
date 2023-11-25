import { Component, HostListener, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideMenuComponent } from '../../components/slide-menu/slide-menu.component';
import { ContextualMenuComponent } from '../../components/contextual-menu/contextual-menu.component';
import { ContextMenuService } from '../../services/context-menu.service';
import { ContextualMenuItem } from '../../model/domain/contextual-menu-item';

@Component({
  selector: 'app-hub',
  standalone: true,
  imports: [CommonModule, SlideMenuComponent, ContextualMenuComponent],
  templateUrl: './hub.component.html',
  styleUrl: './hub.component.scss',
})
export class HubComponent {
  contextMenu: { style?: string; items: ContextualMenuItem[] } = { items: [] };
  constructor(private _contextMenu: ContextMenuService) {
    effect(() => {
      this.contextMenu = this._contextMenu.contextMenu$();
    });
  }

  @HostListener('document:click', ['$event'])
  handleDocumentClick(event: Event): void {
    // Verifica si el clic provino del menú contextual
    const menuElement = document.getElementById('contextMenu');
    if (menuElement && menuElement.contains(event.target as Node)) {
    } else {
      this._contextMenu.close();
    }
  }
}
