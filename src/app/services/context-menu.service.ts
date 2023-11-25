import { Injectable, WritableSignal, signal } from '@angular/core';
import { ContextualMenuItem } from '../model/domain/contextual-menu-item';
import { ContextualItemType } from '../model/enum/contextual-item-type';
import { sign } from 'web3/lib/commonjs/eth.exports';

@Injectable({
  providedIn: 'root',
})
export class ContextMenuService {
  contextMenu$: WritableSignal<{style?: string; items: ContextualMenuItem[];}> = signal({items:[]});
  event!: MouseEvent;
  constructor() {}

  async openDialog(event?: MouseEvent | any) {
    if(event.target != undefined){
      this.event = event;
    }
    let node: any = event.target != undefined ? event.target : event;
    {
      let max = 0;
      while (node.dataset.encoreId == undefined && max < 4) {
        node = node.parentNode;
        max++;
      }
      if (max == 4) {
        return;
      } else {
        const style=this.calculatePosition(this.event);

        switch (node.dataset.encoreId) {
          case 'home':
            this.contextMenu$.set(this.home(style));
            break;
          case 'add':
            this.contextMenu$.set(this.add(style));
            break;
          default:
            console.log('No se ha encontrado el elemento', node);
            this.openDialog(node.parentNode);
            break;
        }
      }
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

  home(style?: string): { style?: string; items: ContextualMenuItem[] } {
    return {
      style: style,
      items: 
      [
        {
          svg: [
            {
              icon: `<svg
              data-encore-id="icon"
              role="icon"
              aria-hidden="true"
              viewBox="0 0 16 16"
              >
                <path
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm11.748-1.97a.75.75 0 0 0-1.06-1.06l-4.47 4.47-1.405-1.406a.75.75 0 1 0-1.061 1.06l2.466 2.467 5.53-5.53z"
                ></path>
              </svg>`,
              style: 'fill-green-500 w-5 h-5',
            },
          ],
          title: 'Quitar de tu biblioteca',
          callback: () => {
            console.log('Quitar de tu biblioteca');
          },
        },
        {
          type: ContextualItemType.hr,
        },

        {
          svg: [
            {
              icon: '<svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16"><path d="M16 15H2v-1.5h14V15zm0-4.5H2V9h14v1.5zm-8.034-6A5.484 5.484 0 0 1 7.187 6H13.5a2.5 2.5 0 0 0 0-5H7.966c.159.474.255.978.278 1.5H13.5a1 1 0 1 1 0 2H7.966zM2 2V0h1.5v2h2v1.5h-2v2H2v-2H0V2h2z"></path></svg>',
              style: 'fill-white/80 w-4 h-4',
            },
          ],
          title: 'Añadir a la cola',
          callback: () => {
            console.log('Añadiendo a la cola...');
          },
        },
        {
          svg: [
            {
              icon: '<svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" class="Svg-sc-ytk21e-0 dCszzJ"><path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zM1.5 8a6.5 6.5 0 1 1 11.395 4.277 3.504 3.504 0 0 0-1.163-1.088l-1.523-.88a.285.285 0 0 1-.076-.428l.086-.104v-.001c.549-.654.962-1.449 1.02-2.422.03-.526-.055-1.074-.165-1.395a3.23 3.23 0 0 0-.671-1.154 3.259 3.259 0 0 0-4.806 0 3.23 3.23 0 0 0-.672 1.154c-.109.32-.195.87-.163 1.395.057.973.47 1.768 1.018 2.422l.087.105a.285.285 0 0 1-.076.428l-1.523.88a3.506 3.506 0 0 0-1.163 1.088A6.475 6.475 0 0 1 1.5 8zm2.74 5.302c.173-.334.44-.62.778-.814l1.523-.88A1.784 1.784 0 0 0 7.02 8.92l-.088-.105-.002-.002c-.399-.476-.637-.975-.671-1.548a2.71 2.71 0 0 1 .087-.824 1.74 1.74 0 0 1 .357-.623 1.76 1.76 0 0 1 2.594 0c.155.17.274.378.357.623a2.716 2.716 0 0 1 .087.824c-.034.573-.272 1.072-.671 1.548l-.002.002-.088.105c-.709.85-.48 2.135.479 2.688l1.523.88c.338.195.605.48.779.814A6.47 6.47 0 0 1 8 14.5a6.47 6.47 0 0 1-3.76-1.198z"></path></svg>',
              style: 'h-4 w-4 fill-white/80',
            },
          ],
          title: 'Añadir al perfil',
          callback: () => {
            console.log('Añadido a tu perfil');
          },
        },
        {
          type: ContextualItemType.hr,
        },
        {
          svg: [
            {
              icon: '<svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" class="Svg-sc-ytk21e-0 dCszzJ"><path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zM1.5 8a6.5 6.5 0 1 1 11.395 4.277 3.504 3.504 0 0 0-1.163-1.088l-1.523-.88a.285.285 0 0 1-.076-.428l.086-.104v-.001c.549-.654.962-1.449 1.02-2.422.03-.526-.055-1.074-.165-1.395a3.23 3.23 0 0 0-.671-1.154 3.259 3.259 0 0 0-4.806 0 3.23 3.23 0 0 0-.672 1.154c-.109.32-.195.87-.163 1.395.057.973.47 1.768 1.018 2.422l.087.105a.285.285 0 0 1-.076.428l-1.523.88a3.506 3.506 0 0 0-1.163 1.088A6.475 6.475 0 0 1 1.5 8zm2.74 5.302c.173-.334.44-.62.778-.814l1.523-.88A1.784 1.784 0 0 0 7.02 8.92l-.088-.105-.002-.002c-.399-.476-.637-.975-.671-1.548a2.71 2.71 0 0 1 .087-.824 1.74 1.74 0 0 1 .357-.623 1.76 1.76 0 0 1 2.594 0c.155.17.274.378.357.623a2.716 2.716 0 0 1 .087.824c-.034.573-.272 1.072-.671 1.548l-.002.002-.088.105c-.709.85-.48 2.135.479 2.688l1.523.88c.338.195.605.48.779.814A6.47 6.47 0 0 1 8 14.5a6.47 6.47 0 0 1-3.76-1.198z"></path></svg>',
              style: 'h-4 w-4 fill-white/80',
            },
          ],
          title: 'Añadir al perfil',
          callback: () => {
            console.log('Quitar de tu biblioteca');
          },
        },
      ],
    };
  }

  add(style?: string): { style?: string; items: ContextualMenuItem[] } {
    console.log(style);
    return {
      style: style,
      items: 
      [
        {
          svg: [
            {
              icon: `<svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" class="Svg-sc-ytk21e-0 dCszzJ"><path d="M2 0v2H0v1.5h2v2h1.5v-2h2V2h-2V0H2zm11.5 2.5H8.244A5.482 5.482 0 0 0 7.966 1H15v11.75A2.75 2.75 0 1 1 12.25 10h1.25V2.5zm0 9h-1.25a1.25 1.25 0 1 0 1.25 1.25V11.5zM4 8.107a5.465 5.465 0 0 0 1.5-.593v5.236A2.75 2.75 0 1 1 2.75 10H4V8.107zM4 11.5H2.75A1.25 1.25 0 1 0 4 12.75V11.5z"></path></svg>`,
            },
          ],
          title: 'Crear lista',
          callback: () => {
            console.log('Creando lista');
          },
        },
        {
          svg: [
            {
              icon: '<svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" class="Svg-sc-ytk21e-0 dCszzJ"><path d="M15.25 8a.75.75 0 0 1-.75.75H8.75v5.75a.75.75 0 0 1-1.5 0V8.75H1.5a.75.75 0 0 1 0-1.5h5.75V1.5a.75.75 0 0 1 1.5 0v5.75h5.75a.75.75 0 0 1 .75.75z"></path></svg>',
            },
          ],
          title: 'Crear carpeta',
          callback: () => {
            console.log('creando carpeta...');
          },
        },
      ],
    }
  }


  close():void{
    this.contextMenu$.set({items:[]});
  }
}
