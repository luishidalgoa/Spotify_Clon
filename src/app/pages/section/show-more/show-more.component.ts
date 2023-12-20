import { Component, Input } from '@angular/core';
import { ReduceData } from '../../../model/domain/api/spotify/reduce-data';
import { ActivatedRoute } from '@angular/router';
import { SectionService } from '../../../services/common/section.service';
import { BigCardComponent } from '../../../components/cards/big-card/big-card.component';
import { skeletonPlatListBigCardComponent } from '../../../components/items/skeleton/plat-list-big-card/plat-list-big-card.component';
import { Section } from '../../../model/domain/api/spotify/section';

@Component({
  selector: 'app-show-more',
  standalone: true,
  imports: [BigCardComponent,skeletonPlatListBigCardComponent],
  templateUrl: './show-more.component.html',
  styleUrl: './show-more.component.scss'
})
export class ShowMoreComponent {
  @Input({required: true}) 
  items!: Section | null; 
  

  constructor(private section: SectionService) { 
    
  }

  ngOnInit(): void {
    this.section.getSectionItems().then((items) => {
      this.items = items
    })
  }

}
