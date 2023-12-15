import { Component, ElementRef, HostListener, Input, ViewChild,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BigCardComponent } from '../../components/cards/big-card/big-card.component';
import { ReduceData } from '../../model/domain/api/spotify/reduce-data';
import { SyncViewService } from '../../services/common/sync-view.service';
import { skeletonPlatListBigCardComponent } from '../../components/items/skeleton/plat-list-big-card/plat-list-big-card.component';
import { Router } from '@angular/router';
import { state } from '@angular/animations';
import { SectionService } from '../../services/common/section.service';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [CommonModule,BigCardComponent,skeletonPlatListBigCardComponent],
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss'
})
export class SectionComponent {
  @Input({required: true}) 
  items!: {title: string, data?: ReduceData[]};

  wrapper!: ReduceData[];
  private syncS = inject(SyncViewService);
  

  constructor(private router:Router) { 
  }
  
  ngOnInit(): void {
    ;
  }

  ngAfterViewInit(): void {

    this.syncS.sync.subscribe(() => {    
      this.onResize(null);
    })
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

  private _section:SectionService = inject(SectionService);
  navigate(){
    this._section.setSectionItems = this.items
    this.router.navigate([`section`,this.items.title.replace(' ','%').trim()]);
  }
}
