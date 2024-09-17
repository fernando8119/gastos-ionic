import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { Categoria } from '../models/categoria';

@Injectable({
  providedIn: 'root',
})
export class CategoriasService {
  obtenerCategorias(): Observable<Categoria[]> {
    const categorias: Categoria[] = [

      { id: 1, nombre: 'Nómina' },
      { id: 2, nombre: 'Ropa' },
      { id: 3, nombre: 'Ocio' },
      { id: 4, nombre: 'Sanidad' },
      { id: 5, nombre: 'Comida' },
      { id: 6, nombre: 'Regalos' },

    ];
    return of(categorias);
  }
}
