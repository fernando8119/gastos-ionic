
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gasto } from '../models/gasto';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GastoService {
  apiUrl = 'http://localhost:3000/api/cuentas'; // Cambia esto a la URL real de tu backend

  constructor(private http: HttpClient) {}

  getOperaciones(): Observable<Gasto[]> {
    return this.http.get<Gasto[]>(`${this.apiUrl}/operaciones`);
  }

  agregarOperaciones(operacion: Gasto): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/operaciones`, operacion);
  }

  getTotales(): Observable<{ totalGastos: number, totalIngresos: number }> {
    return this.http.get<{ totalGastos: number, totalIngresos: number }>(`${this.apiUrl}/operaciones/folder/gastos`);
  }

  actualizarTotales(totales: { totalGastos: number, totalIngresos: number }): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/operaciones/folder/gastos`, totales).pipe(
      tap({
        next: () => console.log('Totales actualizados'),
        error: (error) => console.error('Error al actualizar los totales:', error)
      })
    );
  }
}
