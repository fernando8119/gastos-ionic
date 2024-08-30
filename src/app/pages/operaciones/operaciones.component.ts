import { Component, OnInit} from '@angular/core';
import { Operacion } from 'src/app/models/operacion';
import { ActivatedRoute, Router } from '@angular/router';
import { OperacionesService } from 'src/app/services/operaciones.service';
import { DatePipe} from '@angular/common';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Operamok } from 'src/app/interfaces/operamok.interface';
import { operamok } from '../../../backend/operamok';


@Component({
  selector: 'app-operaciones',
  templateUrl: './operaciones.component.html',
  styleUrls: ['./operaciones.component.scss']
})
export class OperacionesComponent implements OnInit {

  public appPages = [
    { title: 'Gastos', url: 'folder/gastos', icon: 'heart' },

  ];
  operaciones: Observable<Operacion[]> =this.operacionesService.operacionesS
  //operamok: Operamok[] = [];
  id: string = '';



  constructor(private operacionesService: OperacionesService,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    public router: Router,
    private alertController: AlertController)

    { }



  ngOnInit(): void {

    //this.getoperamok();
    this.getOperaciones();

    // })
  }
//   getoperamok() {



//     this.operacionesService.getOperamok().subscribe((operamok) => (this.operamok=operamok));


//  }
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
    return cantidad > 0 ? 'ingreso' : 'gasto';
  }

  botonNuevo() {
    // Swal.fire('¡Se procede a añadir operación!');
    this.router.navigate(['/operacion/nueva']);

  }

}














