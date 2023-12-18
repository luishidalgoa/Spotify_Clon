import { Directive, ElementRef, HostListener, Input, Renderer2, inject } from '@angular/core';
import { ContextualMenuItem } from '../model/domain/contextual-menu-item';
import { ContextMenuService } from '../services/context-menu.service';
import { style } from '@angular/animations';

export interface directive {
  items: ContextualMenuItem[],
  control?: 'right' | 'left'
}

@Directive({
  selector: '[appContextualmenu]',
  standalone: true
})
export class ContextualmenuDirective{

  @Input() contextMenuParams: directive = {items: [],control: 'right'};
  private contextMenu: ContextMenuService= inject(ContextMenuService);

  constructor(private el: ElementRef, private renderer: Renderer2) { }


  @HostListener('contextmenu', ['$event'])
  create(event: MouseEvent) {
    this.contextMenu.openDialog(this.contextMenuParams.items,event).then(()=>{
      document.addEventListener('click', this.handleDocumentClick.bind(this), true);
      document.addEventListener('contextmenu', this.handleContextMenu.bind(this), true);
    });
    event.preventDefault();

  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent){
    if(this.contextMenuParams.control === 'left'){
      this.create(event);
    }
  }
  
  handleDocumentClick(event: Event): void {
    // Verifica si el clic provino del menú contextual
    const menuElement = document.getElementById('contextMenu');
    if(this.el.nativeElement.contains(event.target) || (menuElement && menuElement.contains(event.target as Node))){
      return;
    }else{
      this.contextMenu.close();
    }
  }
  handleContextMenu(event: Event): void {
    // Verifica si el clic derecho provino del menú contextual
    const menuElement = document.getElementById('contextMenu');
    if(this.el.nativeElement.contains(event.target) || (menuElement && menuElement.contains(event.target as Node))){
      return;
    }else{
      this.contextMenu.close();
    }
  }


  /**
   * Vamos hacer un calculo de la posición del ratón para que el menú contextual se muestre en la posición correcta
   * y no se salga de la pantalla
   * @param event
   * @return devolveremos un estilo css con la posición del menú contextual
   */
  calculatePosition(event: any): string {
    let x = event.clientX;
    let y = event.clientY;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let menuWidth = 250;
    let menuHeight = 250;
    let xPosition = x + menuWidth > width ? x - menuWidth : x;
    let yPosition = y + menuHeight > height ? y - menuHeight : y;
    return `left:${xPosition}px;top:${yPosition}px;`;
  }

  
}