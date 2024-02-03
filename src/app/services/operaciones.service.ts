import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject, Subject, map, of } from 'rxjs';
import { Operacion } from '../models/operacion';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { Operamok } from '../interfaces/operamok.interface';
import { operamok } from 'src/backend/operamok';


@Injectable({
  providedIn: 'root',
})
export class OperacionesService {
operacionesSubj: ReplaySubject<Operacion[]> = new ReplaySubject();
  operacionesS: Observable<Operacion[]> = this.operacionesSubj.asObservable();
  apiUrl = 'http://localhost:3000/api/cuentas';

  operamok: Operamok = operamok;

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
//get del falso backend
  getOperamok(): Observable<Operamok> {
    return of(this.operamok);
  }


  getOperaciones() {

     this.http.get<Operacion[]>(`${this.apiUrl}/operaciones`).subscribe(data => {
      this.operacionesSubj.next(data)
    });
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
