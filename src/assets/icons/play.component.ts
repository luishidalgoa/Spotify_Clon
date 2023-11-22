import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'icon-play',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg role="icon" viewBox="0 0 24 24" class="h-8 w-8" fill="currentColor">
      <path fill="currentColor" d="M8 5.14v14l11-7-11-7z"></path>
    </svg>
  `,
  styles: ``,
})
export class PlayComponent {}
