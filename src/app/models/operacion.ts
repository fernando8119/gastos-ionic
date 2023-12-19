import { Data } from '@angular/router';

export interface Operacion {

  descripcion: string;
  cantidad: number;
  categoria: string;
  fecha: string;
  //tipo: { type: String, enum: ['ingreso'] };
  _id?: string;
}
