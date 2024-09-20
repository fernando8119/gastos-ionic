import { Component, OnInit } from '@angular/core';
import { PresupuestoService } from 'src/app/services/presupuesto.service';
import { GastoService } from 'src/app/services/gasto.service';
import { Presupuesto } from 'src/app/models/presupuesto';
import { Gasto } from 'src/app/models/gasto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-presupuesto',
  templateUrl: './presupuesto.component.html',
  styleUrls: ['./presupuesto.component.scss']
})
export class PresupuestoComponent implements OnInit {
  presupuestos: Presupuesto[] = [];
  nuevoPresupuesto: Presupuesto = {
    mes: 0,
    anio: 0,
    cantidadMaxima: 0,
    totalGastado: 0,
    _id: ''
  };
  presupuestoAActualizar: Presupuesto | null = null;
  estadoPresupuesto: string = '';

  constructor(private presupuestoService: PresupuestoService, private gastoService: GastoService, public router: Router) {}

  ngOnInit(): void {
    this.loadPresupuestos();
  }

  crearPresupuesto(): void {
    if (this.nuevoPresupuesto.mes && this.nuevoPresupuesto.anio && this.nuevoPresupuesto.cantidadMaxima !== 0) {
      console.log('Creando presupuesto:', this.nuevoPresupuesto);
      this.presupuestoService.crearPresupuesto(this.nuevoPresupuesto).subscribe(
        response => {
          console.log('Presupuesto creado:', response);
          this.loadPresupuestos();
          this.resetNuevoPresupuesto();
        },
        error => {
          console.error('Error al crear presupuesto', error);
        }
      );
    } else {
      console.error('Datos del presupuesto incompletos.');
    }
  }

  loadPresupuestos(): void {
    this.presupuestoService.getPresupuestosPorMes().subscribe(
      presupuestos => {
        console.log('Respuesta completa de presupuestos:', presupuestos); // Añade esta línea para ver el resultado completo
        this.presupuestos = presupuestos;
        console.log('Presupuestos cargados:', this.presupuestos);
        this.calcularEstadoPresupuestos();
      },
      error => {
        console.error('Error al obtener presupuestos', error);
      }
    );
  }
  calcularEstadoPresupuestos(): void {
    // Obtenemos todas las operaciones
    this.gastoService.getOperaciones().subscribe(
      operaciones => {
        console.log('Todas las operaciones obtenidas:', operaciones);

        if (!Array.isArray(operaciones) || operaciones.length === 0) {
          console.log('No hay operaciones disponibles.');
          return;
        }

        // Iteramos sobre todos los presupuestos
        this.presupuestos.forEach(presupuesto => {
          const mesActual = presupuesto.mes;
          const anioActual = presupuesto.anio;

          // Filtrar las operaciones del mes y año del presupuesto actual
          const operacionesMes = operaciones.filter(op => {
            const fechaOperacion = new Date(op.fecha); // Asegúrate de que 'fecha' es el campo correcto
            return (fechaOperacion.getMonth() + 1 === mesActual) && (fechaOperacion.getFullYear() === anioActual);
          });

          console.log(`Operaciones para ${mesActual}/${anioActual}:`, operacionesMes);

          if (operacionesMes.length === 0) {
            console.log(`No hay operaciones para el mes ${mesActual}/${anioActual}.`);
            return;
          }

          // Calcular el total gastado en las operaciones filtradas
          const totalGastado = operacionesMes.reduce((sum: number, op: Gasto) => sum + (op.cantidad < 0 ? op.cantidad : 0), 0);

          // Comparar el total gastado con el presupuesto de ese mes
          this.compararPresupuesto(totalGastado, presupuesto);
        });
      },
      error => {
        console.error('Error al obtener todas las operaciones:', error);
      }
    );
  }

  compararPresupuesto(totalGastado: number, presupuesto: Presupuesto): void {
    if (totalGastado > presupuesto.cantidadMaxima) {
      this.estadoPresupuesto = '¡Presupuesto sobrepasado!';
    } else if (totalGastado >= presupuesto.cantidadMaxima * 0.9) {
      this.estadoPresupuesto = '¡Casi alcanzado el límite del presupuesto!';
    } else {
      this.estadoPresupuesto = 'Dentro del límite del presupuesto.';
    }
    console.log('Total gastado:', totalGastado);
    console.log('Cantidad máxima del presupuesto:', presupuesto.cantidadMaxima);

  }

  selectPresupuesto(presupuesto: Presupuesto): void {
    this.presupuestoAActualizar = { ...presupuesto };
  }

  actualizarPresupuesto(id?: string): void {
    if (id && this.presupuestoAActualizar) {
      this.presupuestoService.actualizarPresupuesto(id, this.presupuestoAActualizar).subscribe(
        response => {
          console.log('Presupuesto actualizado:', response);
          this.loadPresupuestos(); // Recargar la lista de presupuestos
          this.presupuestoAActualizar = null; // Resetear el formulario de actualización
        },
        error => {
          console.error('Error al actualizar presupuesto', error);
        }
      );
    } else {
      console.error('No hay presupuesto seleccionado o el ID es inválido.');
    }
  }



  private resetNuevoPresupuesto() {
    this.nuevoPresupuesto = {
      mes: 0,
      anio: 0,
      cantidadMaxima: 0,
      totalGastado: 0,
      _id: ''
    };
  }
}
