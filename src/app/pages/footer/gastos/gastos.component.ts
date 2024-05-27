import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Operacion {
  cantidad: number;
  categoria: string;
  descripcion: string;
  fecha: Date;
  tipo: 'ingreso' | 'gasto';
}

@Component({
  selector: 'app-root',
  templateUrl: 'gastos.component.html',
  styleUrls: ['gastos.component.scss'],
})
export class GastosComponent {
  public appPages = [
    { title: 'Gastos', url: '/folder/gastos' },
  ];

  operaciones: Operacion[] = [];
  operacionForm: FormGroup;
  mostrarFormulario: boolean = false;
  totalGastos: number = 0; // Total acumulado de gastos
  totalIngresos: number = 0; // Total acumulado de ingresos

  constructor(public router: Router, private fb: FormBuilder) {
    this.operacionForm = this.fb.group({
      descripcion: ['', Validators.required],
      cantidad: ['', [Validators.required, Validators.min(-99999999.99)]],
      fecha: ['', Validators.required],
      categoria: ['', Validators.required]
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
        categoria: this.operacionForm.value.categoria,
        descripcion: this.operacionForm.value.descripcion,
        fecha: new Date(this.operacionForm.value.fecha),
        tipo: tipoOperacion
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
