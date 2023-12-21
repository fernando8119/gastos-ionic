import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Operacion } from 'src/app/models/operacion';
import { NgForm, FormsModule } from '@angular/forms';
import { OperacionesService } from '../../services/operaciones.service';
import { CategoriasService } from 'src/app/services/categorias.service';
import { Categoria } from 'src/app/models/categoria';

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
    private router: Router
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

    // Mensaje de consola para reemplazar Swal.fire
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
    // Mensaje de consola para reemplazar Swal.fire
    this.operacionesService.editoOperaciones(this.editooperacion).subscribe({
      next: () => {
        this.router.navigate(['/operaciones']);
      },
      
    });
    

    // Continuar con la lógica de edición aquí...
  }
}
