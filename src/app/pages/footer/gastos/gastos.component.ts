import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GastoService } from 'src/app/services/gasto.service';
import { Categoria } from 'src/app/models/categoria';
import { CategoriasService } from 'src/app/services/categorias.service';
import { Router } from '@angular/router';

interface Gasto {
  cantidad: number;
  categoria: string;
  descripcion: string;
  fecha: string;
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
    public router: Router  // <-- Inyecta el Router aquí
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

        const mesNombre = this.meses[mesOperacion];

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
      const nuevaOperacion: Gasto = {
        descripcion: this.operacionForm.value.descripcion,
        cantidad: parseFloat(this.operacionForm.value.cantidad),
        fecha: new Date(this.operacionForm.value.fecha).toISOString(),
        categoria: this.operacionForm.value.categoria,
        tipo: parseFloat(this.operacionForm.value.cantidad) >= 0 ? 'ingreso' : 'gasto',
      };

      this.operaciones.push(nuevaOperacion);
      this.gastoService.agregarOperaciones(nuevaOperacion).subscribe(() => {
        this.filtrarOperaciones(); // Refrescar la lista de operaciones
        this.calcularTotales();
        // Extraer mes y año de la fecha seleccionada
        const fecha = new Date(this.operacionForm.value.fecha);
        const mes = fecha.getMonth() + 1; // Los meses en JS van de 0 a 11, así que sumamos 1
        const anio = fecha.getFullYear();

        // Llamada a actualizar totales en el backend
        this.gastoService.actualizarTotales(mes, anio, this.totalGastos, this.totalIngresos)
          .subscribe(() => {
            console.log('Totales actualizados en el backend.');
          });

        // Ocultar el formulario y reiniciarlo
        this.mostrarFormulario = false;
        this.operacionForm.reset();
      });
    }

  }

  calcularTotales() {
    console.log('Operaciones Filtradas para cálculo:', this.operacionesFiltradas);

    // Inicializa los totales
    this.totalGastos = 0;
    this.totalIngresos = 0;

    // Itera sobre las operaciones filtradas y calcula los totales
    this.operacionesFiltradas.forEach((op) => {
      console.log('Procesando operación:', op);

      const cantidad = parseFloat(op.cantidad.toString());

      if (!isNaN(cantidad)) {
        if (cantidad < 0) {
          // Si la cantidad es negativa, es un gasto
          this.totalGastos += cantidad;
        } else {
          // Si la cantidad es positiva, es un ingreso
          this.totalIngresos += cantidad;
        }
      } else {
        console.warn('Cantidad inválida:', op.cantidad);
      }
    });

    console.log('Total Gastos:', this.totalGastos);
    console.log('Total Ingresos:', this.totalIngresos);
  }


}
