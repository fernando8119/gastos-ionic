import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Operacion } from 'src/app/models/operacion';
import { NgForm, FormsModule } from '@angular/forms';
import { OperacionesService } from '../../services/operaciones.service';
import Swal from 'sweetalert2';
import { CategoriasService } from 'src/app/services/categorias.service';
import { Categoria } from 'src/app/models/categoria'




@Component({
  selector: 'app-editar-operacion',
  templateUrl: './editar-operacion.component.html',
  styleUrls: ['./editar-operacion.component.scss']
})
export class EditarOperacionComponent implements OnInit {

  editooperacion: Operacion = { _id: '' } as Operacion

  id: string =''

  categorias: Categoria[] = [];
  constructor(
    private operacionesService: OperacionesService,
    private categoriasService: CategoriasService,
    private route: ActivatedRoute,
    private router: Router) {
    
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
      // Si es un array, toma el primer elemento (asumiendo que solo hay uno)
      this.editooperacion = data[0];
    } else {
      // Si es un solo objeto, úsalo directamente
      this.editooperacion = data;
    }
  });

  Swal.fire({
    title: 'Editando elemento',
    text: `Editando el elemento con ID: ${id}`,
    icon: 'info',
    confirmButtonText: 'Ok'
  });
  }

   // no se si debería ponerlo en service
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
    // Mostrar SweetAlert de confirmación antes de editar
    Swal.fire({
      title: 'Deseas editar?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, editar'
    }).then((result: any) => {
      if (result.isConfirmed) {
        // Continuar con la edición
        this.operacionesService.editoOperaciones(this.editooperacion).subscribe({
          next: () => {
            // SweetAlert de edición finalizada
            Swal.fire('¡Edición finalizada!', 'Cambios guardados con éxito', 'success');
            this.router.navigate(['/operaciones']);
          },
          error: (error: any) => {
            // SweetAlert de error al guardar cambios
            Swal.fire('Error', 'Error al guardar cambios: ' + error, 'error');
            console.error('Error al guardar cambios:', error);
          },
          complete: () => {
            console.log('completa');
            // Acciones a realizar cuando la operación está completa (opcional)
          }
        });
      }
    });
  }






  }




