import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cell',
  template: `{{ value | player }}`,
})
export class CellComponent {
  @Input()
  value: number | null = null;
}
