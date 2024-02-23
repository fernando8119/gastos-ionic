import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-presupuesto',
  templateUrl: './presupuesto.component.html',
  styleUrls: ['./presupuesto.component.scss'],
})
export class PresupuestoComponent{
  public appPages = [
    { title: 'Presupuesto', url: '/folder/presupuesto' },

  ];
  constructor(public router: Router) {
  }



}
