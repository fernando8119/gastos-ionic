import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categoria } from 'src/app/models/categoria';
import { CategoriasService } from 'src/app/services/categorias.service';

interface Operacion {
  cantidad: number;
  categoria: string; // Cambié 'categorias' a 'categoria' para concordar con el HTML
  descripcion: string;
  fecha: Date;
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

  operaciones: Operacion[] = [];
  operacionForm: FormGroup;
  mostrarFormulario: boolean = false;
  totalGastos: number = 0; // Total acumulado de gastos
  totalIngresos: number = 0; // Total acumulado de ingresos
  categorias: Categoria[] = [];

  constructor(
    public router: Router,
    private fb: FormBuilder,
    private categoriasService: CategoriasService
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

  agregarOperacion() {
    if (this.operacionForm.valid) {
      const cantidad = parseFloat(this.operacionForm.value.cantidad);
      const tipoOperacion = cantidad >= 0 ? 'ingreso' : 'gasto';

      const operacion: Operacion = {
        cantidad: cantidad,
        categoria: this.operacionForm.value.categoria, // Cambié 'categorias' a 'categoria'
        descripcion: this.operacionForm.value.descripcion,
        fecha: new Date(this.operacionForm.value.fecha),
        tipo: tipoOperacion,
      };

      this.operaciones.push(operacion);

      // Actualizar el total de gastos e ingresos
      if (tipoOperacion === 'gasto') {
        this.totalGastos += cantidad;
      } else {
        this.totalIngresos += cantidad;
      }

      this.mostrarFormulario = false;
      this.operacionForm.reset();
    }
  }
}
