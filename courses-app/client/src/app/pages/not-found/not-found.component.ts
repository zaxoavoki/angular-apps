import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styles: ['h1 {margin-top: 45vh !important;}'],
})
export class NotFoundComponent {
  constructor(private titleSerivce: Title) {
    this.titleSerivce.setTitle('Page not found');
  }
}
