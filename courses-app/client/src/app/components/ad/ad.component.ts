import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ad',
  template: `
    <img src="{{ data.picture }}" alt="Image" class="w-100 mb-2 rounded" />
    <p>
      {{ data.text }}
    </p>
  `,
  styles: [],
})
export class AdComponent {
  @Input() data: any;
}
