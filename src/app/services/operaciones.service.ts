import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Operacion } from '../models/operacion';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class OperacionesService {
  apiUrl = 'http://localhost:3000/api/cuentas';

  constructor(private http: HttpClient) {}

  agregarOperaciones(operaciones: Operacion): Observable<string>{
    return this.http.post(`${this.apiUrl}/operaciones`, operaciones, {responseType: 'text'})
      .pipe(
        catchError((error: any) => {
          console.error('Error al editar operaciones:', error);
          throw error;


        })
      );

  }

  getOperaciones(): Observable<Operacion[]> {

    return this.http.get<Operacion[]>(`${this.apiUrl}/operaciones`);
  }



  editoOperaciones(operaciones: Operacion){


    return this.http.put(`${this.apiUrl}/operaciones/${operaciones._id}`, operaciones)
  }

  getOperacionesById(id: string): Observable<Operacion[]> {
    return this.http.get<Operacion[]>(`${this.apiUrl}/operaciones/${id}`);
  }

  borrar(id: string) {



    return this.http.delete(`${this.apiUrl}/operaciones/${id}`)




  }

}
