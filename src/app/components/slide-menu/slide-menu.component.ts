import {Component,ElementRef,HostListener,OnInit,Renderer2,Signal,ViewChild,ViewContainerRef,computed} from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { HomeComponent } from '../../../assets/icons/home.component';
import { SearchComponent } from '../../../assets/icons/search.component';
import { LibraryComponent } from '../../../assets/icons/library.component';
import { AddComponent } from '../../../assets/icons/add.component';
import { HamburguerMenuComponent } from '../../../assets/icons/hamburguer-menu.component';
import { LanguageService } from '../../services/language.service';
import { map } from 'rxjs';
import { PlayListMinCardComponent } from '../cards/min-card/min-card.component';
import { skeletonPlayListMinCardComponent } from '../items/skeleton/play-list-min-card/play-list-min-card.component';
import { ContextualMenuComponent } from '../contextual-menu/contextual-menu.component';
import { ContextMenuService } from '../../services/context-menu.service';
import { DataWrapperService } from '../../services/apis/Spotify/data-wrapper.service';
import { User } from '../../model/domain/user';
import { ReduceData } from '../../model/domain/api/spotify/reduce-data';

@Component({
  selector: 'app-slide-menu',
  standalone: true,
  imports: [CommonModule,RouterLinkActive,RouterModule,RouterLink,HomeComponent,SearchComponent,LibraryComponent,AddComponent,
    HamburguerMenuComponent,PlayListMinCardComponent,NgOptimizedImage,skeletonPlayListMinCardComponent,ContextualMenuComponent,
  ],
  templateUrl: './slide-menu.component.html',
  styleUrl: './slide-menu.component.scss',
})
export class SlideMenuComponent implements OnInit {
  @HostListener('document:contextmenu', ['$event'])
  onRightClick(event: Event): void {
    event.preventDefault(); // Evita que aparezca el menú contextual
  }

  tabIndex: number = -1;
  dictionary!: any;
  
  dataWrapper$!: Signal<ReduceData[]>;

  constructor(private languageService: LanguageService,public _contextMenu: ContextMenuService, private _dataWrapper: DataWrapperService, private renderer: Renderer2) {
    this.dataWrapper$ = computed(() => _dataWrapper._dataWrapper$());
    //Cargamos una parte del diccionario de idiomas que nos interesa
    languageService.diccionary
      .pipe(
        map((data: any) => {
          const { lang, components: { Slide_Menu },...rest} = data; //devolvemos diccionary.components.Slide_Menu
          this.dictionary = Slide_Menu;
        })
      )
      .subscribe((data: any) => {
        return data;
      });
  }
  ngOnInit(): void {}

  newContextMenu(event: MouseEvent) {
    this._contextMenu.openDialog(event);
  }

  @ViewChild('playlist')playlist!: ElementRef;
  @ViewChild('artist')artist!: ElementRef;
  @ViewChild('album')album!: ElementRef;
  elements: ElementRef[] = [];
  ngAfterViewInit(){
    this.elements.push(this.playlist,this.artist,this.album);
  }

  /**
   * Algoritmo encargado del control del ordenamiento de los elementos.
   * Se encargara de agregarle estilos a los elementos y de ordenarlos.
   * @param type 
   */
  organize(type:string){
    // buscamos el elemento que tiene la clase active
    const aux=this.elements.find((element: ElementRef)=>{
      return element.nativeElement.id === type;
    }) as ElementRef;

    // si no tiene la clase active, la añadimos y ocultamos los demas elementos
    if(!aux.nativeElement.classList.contains('active')){
      this.renderer.insertBefore(aux.nativeElement.parentElement,this.getCloseOrder(),aux.nativeElement,false);

      this.orderBy(type);
      // añadimos la clase active al elemento que se ha pulsado. y se ocultan los demas
      for(let element of this.elements){
        if(element.nativeElement.id !== type){
          this.renderer.removeClass(element.nativeElement,'active');
          this.renderer.addClass(element.nativeElement,'hidden');
        }else{
          this.renderer.addClass(element.nativeElement,'active');
        }
      }

    }else{ // si tiene la clase active, la eliminamos y mostramos todos los elementos
      this.cancelOrder()
    }
  }

  cancelOrder(){
    //extraemos el padre de los elementos
    const parent=this.elements.values().next().value.nativeElement.parentElement;

    //eliminamos el boton de cerrar
    this.renderer.removeChild(parent,this.renderer.selectRootElement('#closeOrder',true));


    for(let element of this.elements){
      if(!element.nativeElement.classList.contains('active')){
        this.renderer.removeClass(element.nativeElement,'hidden');
      }else{
        this.renderer.removeClass(element.nativeElement,'active');
      }
    }
    this.dataWrapper$ = computed(()=> this._dataWrapper._dataWrapper$());
  }

  orderBy(type:string){
    this.dataWrapper$ = computed(()=> {
      let elements = 0
      for(let element of this._dataWrapper._dataWrapper$()){
        if(element.type === type){
          elements++;
        }
      }

      return this._dataWrapper._dataWrapper$().sort((a,b) => {//a es el elemento de despues y b el de antes
        if(a.type === type) return -1;
        return 0
      }).slice(0,elements);
    });
  }



  /**
   * Crea un nodo HTML el cual su funcion es cerrar el ordenamiento de los elementos.
   * A este nodo le agregaremos por defecto una serie de clases, un ID, un SVG y un evento click.
   * @returns Devuelve un ElementRef con el elemento creado
   */
  getCloseOrder():ElementRef{
    const nuevoBoton = this.renderer.createElement('button');

    this.renderer.setAttribute(nuevoBoton, 'id', 'closeOrder');
    this.renderer.addClass(nuevoBoton, 'bg-white/10');
    this.renderer.addClass(nuevoBoton, 'rounded-full');
    this.renderer.addClass(nuevoBoton, 'px-[0.30rem]');
    this.renderer.addClass(nuevoBoton, 'hover:bg-white/[0.135]');
    this.renderer.addClass(nuevoBoton, 'transition-colors');

    this.renderer.setProperty(nuevoBoton, 'innerHTML', '<span class=""><svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" class="fill-zinc-400 w-5 h-4"><path d="M2.47 2.47a.75.75 0 0 1 1.06 0L8 6.94l4.47-4.47a.75.75 0 1 1 1.06 1.06L9.06 8l4.47 4.47a.75.75 0 1 1-1.06 1.06L8 9.06l-4.47 4.47a.75.75 0 0 1-1.06-1.06L6.94 8 2.47 3.53a.75.75 0 0 1 0-1.06Z"></path></svg></span>');

    this.renderer.listen(nuevoBoton, 'click', () => this.cancelOrder());
    return nuevoBoton;

  }

  search(event: HTMLInputElement) {
    this.dataWrapper$ = computed(() => this._dataWrapper._dataWrapper$().filter((element: ReduceData) => {
      return element.title.toLowerCase().includes(event.value.toLowerCase());
    }));
  }
}
