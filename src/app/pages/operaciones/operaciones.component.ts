import { Component, OnInit} from '@angular/core';
import { Operacion } from 'src/app/models/operacion';
import { ActivatedRoute, Router } from '@angular/router';
import { OperacionesService } from 'src/app/services/operaciones.service';
import { DatePipe} from '@angular/common';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-operaciones',
  templateUrl: './operaciones.component.html',
  styleUrls: ['./operaciones.component.scss']
})
export class OperacionesComponent implements OnInit {
  operaciones: Observable<Operacion[]> =this.operacionesService.operacionesS

  id: string = '';



  constructor(private operacionesService: OperacionesService,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private router: Router,
    private alertController: AlertController) { }



  ngOnInit(): void {    
    this.getOperaciones();
console.log('yaaaaaaaaaaaaaaaaaaa');

    this.operaciones?.subscribe((fefe) => {
      console.log(fefe);
      
    })
  }
  getOperaciones() {

    this.operacionesService.getOperaciones()
  }

  getOperacion(_id: string) {

    this.operacionesService.getOperacionesById(_id).subscribe((data: Operacion[]) => {
      // this.operaciones = data;
    });

  }

  async borrar(id: string | undefined) {
    if (id !== undefined) {
      const alert = await this.alertController.create({
        header: 'Confirmar',
        message: '¿Estás seguro de que deseas borrar esta operación?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              // Acción al hacer clic en Cancelar
            },
          },
          {
            text: 'Borrar',
            handler: () => {
              // Acción al hacer clic en Borrar
              this.operacionesService.borrar(id).subscribe(() => {
                // Elimina el elemento localmente en tu arreglo de operaciones.
                // this.operaciones = this.operaciones.filter((gasto) => gasto._id !== id);
              });
            },
          },
        ],
      });

      await alert.present();
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














