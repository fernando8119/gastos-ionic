import { Data } from '@angular/router';


  export interface Gasto {
    cantidad: number;
    categoria: string;
    descripcion: string;
    fecha: string;
    _id?: string;
    tipo: 'ingreso' | 'gasto';
  }




