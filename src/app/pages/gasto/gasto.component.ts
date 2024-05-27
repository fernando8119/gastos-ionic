import { Component, OnInit} from '@angular/core';
import { Operacion } from 'src/app/models/operacion';
import { OperacionesService } from 'src/app/services/operaciones.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriasService } from '../../services/categorias.service';
import { Categoria } from 'src/app/models/categoria'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-gasto',
  templateUrl: './gasto.component.html',
  styleUrls: ['./gasto.component.scss'],
})
export class GastoComponent implements OnInit {
  nuevaOperacion: Operacion = {

    descripcion: '',
    cantidad: 0,
    categoria: '',
    fecha: new Date().toISOString(),


  };

  resultadoOperacion: string = '';
  categorias: Categoria[] = [];
  totalGastos: number = 0; // Variable para mantener el total acumulado de los gastos

  constructor(private operacionesService: OperacionesService,
    private categoriasService: CategoriasService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }


  ngOnInit(): void {
    this.categoriasService.obtenerCategorias().subscribe((categorias) => {
      this.categorias = categorias;
    });
  }


  guardar(forma: NgForm) {

    this.operacionesService
      .agregarOperaciones(this.nuevaOperacion)
      .subscribe((resultado: string) => {
        this.resultadoOperacion = resultado;
        this.totalGastos += this.nuevaOperacion.cantidad; // Actualizar el total acumulado
        this.resetForm(); // Reiniciar el formulario después de guardar
        this.router.navigate(['operacion/']);

        // Actualizamos la detección de cambios

      });
  }

  resetForm() {
    // Reiniciamos los valores del objeto nuevaOperacion a su estado inicial
    this.nuevaOperacion = {
      descripcion: '',
      cantidad: 0,
      categoria: '',
      fecha: new Date().toISOString(),
    };
  }

}
