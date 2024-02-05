import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'peraltada.component.html',
  styleUrls: ['peraltada.component.scss'],
})
export class PeraltadaComponent {
  public appPages = [
    { title: 'Peraltada', url: '/folder/peraltada', icon: 'heart' },
   
  ];

  constructor() {}
}
