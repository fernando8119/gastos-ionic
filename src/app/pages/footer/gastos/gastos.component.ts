import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categoria } from 'src/app/models/categoria';
import { CategoriasService } from 'src/app/services/categorias.service';
import { OperacionesService } from 'src/app/services/operaciones.service';
import { Gasto } from 'src/app/models/gasto';


interface Operacion {
  cantidad: number;
  categoria: string; // Cambié 'categorias' a 'categoria' para concordar con el HTML
  descripcion: string;
  fecha: string;
  tipo: 'ingreso' | 'gasto';
}

@Component({
  selector: 'app-root',
  templateUrl: 'gastos.component.html',
  styleUrls: ['gastos.component.scss'],
})
export class GastosComponent implements OnInit {
  public appPages = [
    { title: 'Gastos', url: '/folder/gastos' },
  ];

  operaciones: Gasto[] = [];
  operacionForm: FormGroup;
  mostrarFormulario: boolean = false;
  totalGastos: number = 0; // Total acumulado de gastos
  totalIngresos: number = 0; // Total acumulado de ingresos
  categorias: Categoria[] = [];

  constructor(
    public router: Router,
    private fb: FormBuilder,
    private categoriasService: CategoriasService,
    private operacionesService: OperacionesService // Inyectar el nuevo servicio
  ) {
    this.operacionForm = this.fb.group({
      descripcion: ['', Validators.required],
      cantidad: ['', [Validators.required, Validators.pattern(/^-?\d+(\.\d{1,2})?$/)]], // Acepta números positivos y negativos con hasta dos decimales
      fecha: ['', Validators.required],
      categoria: ['', Validators.required], // Cambié 'categorias' a 'categoria'
    });
  }

  ngOnInit(): void {
    this.categoriasService.obtenerCategorias().subscribe((categorias) => {
      this.categorias = categorias;
    });


  }

  abrirFormulario() {
    this.mostrarFormulario = true;
  }

  agregarGastos() {
    if (this.operacionForm.valid) {
      const cantidad = parseFloat(this.operacionForm.value.cantidad);
      const tipoOperacion = cantidad >= 0 ? 'ingreso' : 'gasto';

      const operacion: Operacion = {
        cantidad: cantidad,
        categoria: this.operacionForm.value.categoria, // Cambié 'categorias' a 'categoria'
        descripcion: this.operacionForm.value.descripcion,
        fecha: new Date(this.operacionForm.value.fecha).toISOString(),
        tipo: tipoOperacion,
      };
      // Llamar al servicio para guardar la operación en el backend
      this.operacionesService.agregarOperaciones(operacion).subscribe(
        (resultado: string) => {
          console.log('Operación guardada:', resultado);

      this.operaciones.push(operacion);

      // Actualizar el total de gastos e ingresos
      if (tipoOperacion === 'gasto') {
        this.totalGastos += cantidad;
      } else {
        this.totalIngresos += cantidad;
      }

      this.mostrarFormulario = false;
      this.operacionForm.reset();
    },
    (error) => {
      console.error('Error al guardar la operación:', error);
    }
  );
}
}

}
