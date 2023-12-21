import { Component, OnInit} from '@angular/core';
import { Operacion } from 'src/app/models/operacion';
import { ActivatedRoute, Router } from '@angular/router';
import { OperacionesService } from 'src/app/services/operaciones.service';
import Swal from 'sweetalert2';
import { DatePipe} from '@angular/common';


@Component({
  selector: 'app-operaciones',
  templateUrl: './operaciones.component.html',
  styleUrls: ['./operaciones.component.scss']
})
export class OperacionesComponent implements OnInit {
  operaciones: Operacion[] = [];
  id: string = '';



  constructor(private operacionesService: OperacionesService,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private router: Router) { }



  ngOnInit(): void {
    this.getOperaciones();
  }
  getOperaciones() {

    this.operacionesService.getOperaciones().subscribe((data: Operacion[]) => {
      this.operaciones = data; // Asigna los datos recuperados del servicio a la variable operaciones
      //console.log(data);
    });
  }

  getOperacion(_id: string) {

    this.operacionesService.getOperacionesById(_id).subscribe((data: Operacion[]) => {
      this.operaciones = data;
    });

  }

  borrar(id: string | undefined) {
    if (id !== undefined) {
      
      
          this.operacionesService.borrar(id).subscribe(() => {
            // Elimina el elemento localmente en tu arreglo de operaciones.
            this.operaciones = this.operaciones.filter(gasto => gasto._id !== id);
          
          });
        }
      }
    
  

  getFilaColor(cantidad: number): string {
    return cantidad >= 0 ? 'positivo' : 'negativo';
  }

  botonNuevo() {
    // Swal.fire('¡Se procede a añadir operación!');
    this.router.navigate(['/operacion/nueva']);

  }

}














