import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'icon-add',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg
      data-encore-id="icon"
      role="icon"
      aria-hidden="true"
      viewBox="0 0 16 16"
      class="Svg-sc-ytk21e-0 kPpCsU"
    >
      <path
        d="M15.25 8a.75.75 0 0 1-.75.75H8.75v5.75a.75.75 0 0 1-1.5 0V8.75H1.5a.75.75 0 0 1 0-1.5h5.75V1.5a.75.75 0 0 1 1.5 0v5.75h5.75a.75.75 0 0 1 .75.75z"
      ></path>
    </svg>
  `,
  styles: ``,
})
export class AddComponent {}
