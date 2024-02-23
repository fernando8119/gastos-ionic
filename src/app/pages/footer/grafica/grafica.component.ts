import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.scss'],
})
export class GraficaComponent {
  public appPages = [
    { title: 'Grafica', url: '/folder/grafica' },

  ];
  constructor(public router: Router) {
  }


}
