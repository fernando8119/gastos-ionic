import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'gastos.component.html',
  styleUrls: ['gastos.component.scss'],
})
export class GastosComponent {
  public appPages = [
    { title: 'Gastos', url: '/folder/gastos' },

  ];

  constructor(public router: Router) {
  }
}
