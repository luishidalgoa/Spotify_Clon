import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContextualItemType } from '../../../model/enum/contextual-item-type';
import { CircleCheckComponent } from '../../../../assets/icons/circle-check.component';
import { ContextualMenuComponent } from '../contextual-menu.component';
import { ContextualMenuItem } from '../../../model/domain/contextual-menu-item';
import { SearchComponent } from '../../../../assets/icons/search.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [CommonModule, CircleCheckComponent],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss',
})
export class contextualMenuItemComponent implements OnInit {
  @Input({ required: true })
  public value!: ContextualMenuItem;

  sanitizedContent!: SafeHtml;

  callback!: () => void;

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    if (this.value != undefined && this.value.svg !== undefined) {
      this.sanitizedContent = this.sanitizer.bypassSecurityTrustHtml(
        this.value.svg[0].icon
      );
    }


    this.callback = () => {
      if (this.value.callback !== undefined) {
        this.value.callback();
      }
    };

    if (this.value.type === undefined) {
      this.value.type = ContextualItemType.list;
    }
  }
}
