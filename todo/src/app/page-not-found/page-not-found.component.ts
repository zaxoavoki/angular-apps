import { Component } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `
    <h1 class="py-5 fw-bold display-1">Page not found</h1>
    <a routerLink="/">Main page</a>
  `,
  styles: [],
})
export class PageNotFoundComponent {}
