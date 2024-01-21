import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Operacion } from 'src/app/models/operacion';
import { NgForm, FormsModule } from '@angular/forms';
import { OperacionesService } from '../../services/operaciones.service';
import { CategoriasService } from 'src/app/services/categorias.service';
import { Categoria } from 'src/app/models/categoria';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-editar-operacion',
  templateUrl: './editar-operacion.component.html',
  styleUrls: ['./editar-operacion.component.scss']
})
export class EditarOperacionComponent implements OnInit {

  editooperacion: Operacion = { _id: '' } as Operacion;
  id: string = '';
  categorias: Categoria[] = [];

  constructor(
    private operacionesService: OperacionesService,
    private categoriasService: CategoriasService,
    private route: ActivatedRoute,
    private router: Router,
    private alertController: AlertController
  ) {
    this.categoriasService.obtenerCategorias().subscribe((categorias: any) => {
      this.categorias = categorias;
    });
  }

  ngOnInit(): void {
    this.editByid();
  }

  getById(id: string) {
    this.operacionesService.getOperacionesById(id).subscribe((data: Operacion | Operacion[]) => {
      if (Array.isArray(data)) {
        this.editooperacion = data[0];
      } else {
        this.editooperacion = data;
      }
    });

  
    console.log(`Editando el elemento con ID: ${id}`);
  }

  editByid() {
    this.route.paramMap.subscribe(params => {
      const idFromParams = params.get('id');
      if (idFromParams !== null) {
        this.id = idFromParams;
        this.getById(this.id);
      } else {
        console.error('El parámetro "id" es nulo.');
      }
    });
  }
  

  guardarCambios(): void {
    this.presentConfirmAlert();
  }

  async presentConfirmAlert() {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Estás seguro que quieres guardar los cambios?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Operación de guardar cancelada');
          }
        }, {
          text: 'Guardar',
          handler: () => {
            this.saveChanges();
          }
        }
      ]
    });

    await alert.present();
  }

  saveChanges() {
    this.operacionesService.editoOperaciones(this.editooperacion).subscribe({
      next: (data) => {
        this.presentAlert('Operación editada exitosamente');
        this.router.navigate(['/operaciones']);
        this.operacionesService.getOperaciones()
      },
      error: (error) => {
        console.error('Error al editar la operación', error);
        this.presentAlert('Error al editar la operación');
      }
    });
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Mensaje',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}

  


