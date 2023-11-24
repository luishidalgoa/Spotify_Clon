import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideMenuComponent } from '../../components/slide-menu/slide-menu.component';

@Component({
  selector: 'app-hub',
  standalone: true,
  imports: [CommonModule,SlideMenuComponent],
  templateUrl: './hub.component.html',
  styleUrl: './hub.component.scss'
})
export class HubComponent {

}
