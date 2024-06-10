import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { Categoria } from '../models/categoria';

@Injectable({
  providedIn: 'root',
})
export class CategoriasService {
  obtenerCategorias(): Observable<Categoria[]> {
    const categorias: Categoria[] = [
      { id: 1, nombre: 'Restaurantes' },
      { id: 2, nombre: 'Ropa' },
      { id: 3, nombre: 'Ocio' },
      { id: 4, nombre: 'Sanidad' },
      { id: 5, nombre: 'Impuestos' },
      { id: 6, nombre: 'Comida' },
      { id: 7, nombre: 'Seguros' },
      { id: 8, nombre: 'Regalos' },

    ];
    return of(categorias);
  }
}
