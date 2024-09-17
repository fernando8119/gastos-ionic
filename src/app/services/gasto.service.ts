
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
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

  agregarOperaciones(operacion: Gasto): Observable<any> {
    return this.http.post<string>(`${this.apiUrl}/operaciones`, operacion);
  }

  getTotales(): Observable<{ totalGastos: number, totalIngresos: number }> {
    return this.http.get<{ totalGastos: number, totalIngresos: number }>(`${this.apiUrl}/operaciones/folder/gastos`);
  }
  getOperacionesPorMes(mes: number, anio: number): Observable<any> {
    let params = new HttpParams()
      .set('mes', mes.toString())
      .set('anio', anio.toString());

    return this.http.get<any>(`${this.apiUrl}/operaciones/folder/gastos/mes`, { params });
  }



  actualizarTotales(mes: number, anio: number, totalGastos: number, totalIngresos: number) {
    return this.http.post(`${this.apiUrl}/operaciones/folder/gastos`, { mes, anio, totalGastos, totalIngresos });
  }

}
