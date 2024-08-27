

import { GastoService } from 'src/app/services/gasto.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categoria } from 'src/app/models/categoria';
import { CategoriasService } from 'src/app/services/categorias.service';

interface Gasto {
  cantidad: number;
  categoria: string;
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
    private gastoService: GastoService
  ) {
    this.operacionForm = this.fb.group({
      descripcion: ['', Validators.required],
      cantidad: ['', [Validators.required, Validators.pattern(/^-?\d+(\.\d{1,2})?$/)]],
      fecha: ['', Validators.required],
      categoria: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.categoriasService.obtenerCategorias().subscribe((categorias) => {
      this.categorias = categorias;
    });

    // Recuperar operaciones guardadas al inicializar el componente
    this.gastoService.getOperaciones().subscribe((operaciones) => {
      this.operaciones = operaciones;
      this.calcularTotales();
    });

    // Recuperar totales desde el backend
    this.gastoService.getTotales().subscribe((totales) => {
      this.totalGastos = totales.totalGastos;
      this.totalIngresos = totales.totalIngresos;
      console.log('Total Gastos:', this.totalGastos);
      console.log('Total Ingresos:', this.totalIngresos);
    });
  }

  abrirFormulario() {
    this.mostrarFormulario = true;
  }

  agregarGastos() {
    if (this.operacionForm.valid) {
      const cantidad = parseFloat(this.operacionForm.value.cantidad);
      const tipoOperacion = cantidad >= 0 ? 'ingreso' : 'gasto';

      const operacion: Gasto = {
        cantidad: cantidad,
        categoria: this.operacionForm.value.categoria,
        descripcion: this.operacionForm.value.descripcion,
        fecha: new Date(this.operacionForm.value.fecha).toISOString(),
        tipo: tipoOperacion,
      };

      // Llamar al servicio para guardar la operación en el backend
      this.gastoService.agregarOperaciones(operacion).subscribe(
        (resultado: string) => {
          console.log('Operación guardada:', resultado);

          this.operaciones.push(operacion);
          this.calcularTotales();

          this.mostrarFormulario = false;
          this.operacionForm.reset();
        },
        (error) => {
          console.error('Error al guardar la operación:', error);
        }
      );
    }
  }

  calcularTotales() {
    this.totalGastos = 0;
    this.totalIngresos = 0;

    for (const operacion of this.operaciones) {
      if (operacion.tipo === 'gasto') {
        this.totalGastos += operacion.cantidad;
      } else if (operacion.tipo === 'ingreso') {
        this.totalIngresos += operacion.cantidad;
      }
    }

    // Guardar totales en el backend
    const totales = {
      totalGastos: this.totalGastos,
      totalIngresos: this.totalIngresos
    };


    this.gastoService.actualizarTotales(totales).subscribe(); // Manejo de errores y respuestas ya está en el servicio
  }
}
