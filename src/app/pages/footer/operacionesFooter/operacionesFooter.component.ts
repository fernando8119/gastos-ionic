import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'operacionesFooter.component.html',
  styleUrls: ['operacionesFooter.component.scss']
})
export class OperacionesFooterComponent {
  public appPages = [
    { title: 'OperacionesFooter', url: 'operaciones', icon: 'heart' },
   
  ];

  constructor() {}
}
