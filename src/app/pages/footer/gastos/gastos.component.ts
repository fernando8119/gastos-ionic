import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GastoService } from 'src/app/services/gasto.service';
import { Categoria } from 'src/app/models/categoria';
import { CategoriasService } from 'src/app/services/categorias.service';
import { Router } from '@angular/router';

interface Gasto {
  descripcion: string;
  cantidad: number;
  fecha: string;
  categoria: string;
  tipo: 'ingreso' | 'gasto';
}

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.scss'],
})
export class GastosComponent implements OnInit {
  meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  mesSeleccionado: string = '';
  operaciones: Gasto[] = [];
  operacionesFiltradas: Gasto[] = [];
  totalGastos: number = 0;
  totalIngresos: number = 0;
  operacionForm: FormGroup;
  mostrarFormulario: boolean = false;
  categorias: Categoria[] = [];

  constructor(
    private fb: FormBuilder,
    private gastoService: GastoService,
    private categoriasService: CategoriasService,
    public router: Router  // Inyecta el Router aquí
  ) {
    this.operacionForm = this.fb.group({
      descripcion: ['', Validators.required],
      cantidad: ['', [Validators.required, Validators.pattern(/^-?\d+(\.\d{1,2})?$/)]],
      fecha: ['', Validators.required],
      categoria: ['', Validators.required],
    });
  }

  ngOnInit() {
    // Cargar las categorías
    this.categoriasService.obtenerCategorias().subscribe((categorias) => {
      this.categorias = categorias;
    });

    // Cargar las operaciones desde el servicio
    this.gastoService.getOperaciones().subscribe((operaciones) => {
      this.operaciones = operaciones;
      this.filtrarOperaciones(); // Filtrar al cargar por el mes seleccionado
    });
  }

  seleccionarMes(mes: string) {
    this.mesSeleccionado = mes;
    this.filtrarOperaciones();
  }

  filtrarOperaciones() {
    if (this.mesSeleccionado) {
      this.operacionesFiltradas = this.operaciones.filter((operacion) => {
        const fechaOperacion = new Date(operacion.fecha);
        const mesOperacion = fechaOperacion.getMonth(); // Devuelve el índice del mes (0-11)
        const anioOperacion = fechaOperacion.getFullYear();

        // Convertir el índice del mes a nombre para comparar con `mesSeleccionado`
        const mesNombre = this.meses[mesOperacion];

        // Comparar mes y permitir cualquier año
        return mesNombre === this.mesSeleccionado;
      });

      this.calcularTotales();
    }
  }

  abrirFormulario() {
    this.mostrarFormulario = true;
  }

  agregarGastos() {
    if (this.operacionForm.valid) {
      const cantidad = parseFloat(this.operacionForm.value.cantidad);
      const tipoOperacion: 'ingreso' | 'gasto' = cantidad >= 0 ? 'ingreso' : 'gasto';

      const nuevaOperacion: Gasto = {
        descripcion: this.operacionForm.value.descripcion,
        cantidad: cantidad,
        fecha: new Date(this.operacionForm.value.fecha).toISOString(),
        categoria: this.operacionForm.value.categoria,
        tipo: tipoOperacion,
      };

      this.operaciones.push(nuevaOperacion);
      this.gastoService.agregarOperaciones(nuevaOperacion).subscribe(() => {
        this.filtrarOperaciones(); // Refrescar la lista de operaciones
        this.calcularTotales();
        this.mostrarFormulario = false;
        this.operacionForm.reset();
      });
    }
  }

  calcularTotales() {
    this.totalGastos = this.operacionesFiltradas
      .filter(op => op.tipo === 'gasto')
      .reduce((acc, op) => acc + op.cantidad, 0);

    this.totalIngresos = this.operacionesFiltradas
      .filter(op => op.tipo === 'ingreso')
      .reduce((acc, op) => acc + op.cantidad, 0);
  }
}
