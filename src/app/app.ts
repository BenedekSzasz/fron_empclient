import { Component, signal } from '@angular/core';
import { EmpComponent } from './emp/emp.component';

@Component({
  selector: 'app-root',
  imports: [EmpComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('empclient');
}
