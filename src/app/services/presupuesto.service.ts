import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';  // Importa throwError desde rxjs
import { catchError, map } from 'rxjs/operators';
import { Presupuesto } from '../models/presupuesto';
//nuevo añadido
interface ApiResponse {
  message: string;
  data: Presupuesto[];
}
// nuevo añadido
@Injectable({
  providedIn: 'root'
})
export class PresupuestoService {
  private apiUrl = 'http://localhost:3000/api/cuentas';  // Cambia esta URL según tu API

  constructor(private http: HttpClient) { }

  // Método para crear un nuevo presupuesto
  crearPresupuesto(presupuestoData: Presupuesto): Observable<Presupuesto> {
    return this.http.post<Presupuesto>(`${this.apiUrl}/operaciones/folder/presupuesto/mes`, presupuestoData)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Método para actualizar un presupuesto existente
  actualizarPresupuesto(id: string, presupuestoData: Presupuesto): Observable<Presupuesto> {
    return this.http.put<Presupuesto>(`${this.apiUrl}/operaciones/folder/presupuesto/mes/${id}`, presupuestoData)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Método para obtener todos los presupuestos de un mes y año
  getPresupuestosPorMes(mes?: number, anio?: number): Observable<Presupuesto[]> {
    let params = new HttpParams();

    if (mes) {
      params = params.set('mes', mes.toString());
    }

    if (anio) {
      params = params.set('anio', anio.toString());
    }

    return this.http.get<ApiResponse>(`${this.apiUrl}/operaciones/folder/presupuesto/mes`, { params })
      .pipe(
        map(response => response.data), // Mapea solo los datos
        catchError(this.handleError)
      );
  }




  // Método para manejar errores en las llamadas HTTP
  private handleError(error: any): Observable<never> {
    console.error('Error en la solicitud', error);
    return throwError(error.message || 'Error en la solicitud al servidor');
  }
}
