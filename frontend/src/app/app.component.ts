import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
    <app-footer> </app-footer>
  `,
  styles: [],
})
export class AppComponent {
  title = 'Homesol';
}
