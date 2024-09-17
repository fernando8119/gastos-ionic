import { Router } from '@angular/router';
import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { GastoService } from 'src/app/services/gasto.service';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.scss'],
})
export class GraficaComponent implements AfterViewInit, OnInit {
  mesSeleccionado: number = 6; // Valor inicial para el mes (por defecto junio)
  anioSeleccionado: number = 2024; // Valor inicial para el año (por defecto 2024)
  private chart: Chart | null = null; // Propiedad para almacenar el gráfico

  constructor(private gastoService: GastoService, public router: Router) { }

  ngOnInit() {
    Chart.register(...registerables);
    this.obtenerDatosYCrearGrafico(this.mesSeleccionado, this.anioSeleccionado);
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit llamado');
  }

  cargarDatos() {
    this.obtenerDatosYCrearGrafico(this.mesSeleccionado, this.anioSeleccionado);
  }

  obtenerDatosYCrearGrafico(mes: number, anio: number): void {
    this.gastoService.getOperacionesPorMes(mes, anio).subscribe(data => {
      console.log('datos a graficar', data);
      this.crearGrafico(data);
    });
  }

  crearGrafico(data: any): void {
    const ctx = document.getElementById('graficoOperaciones') as HTMLCanvasElement;

    if (ctx) {
      const context = ctx.getContext('2d');
      if (context) {
        // Destruir el gráfico existente si existe
        if (this.chart) {
          this.chart.destroy();
        }

        this.chart = new Chart(context, {
          type: 'bar', // Asegúrate de que el tipo de gráfico esté registrado
          data: {
            labels: ['Total Gastos', 'Total Ingresos'], // Ajusta las etiquetas según los datos
            datasets: [{
              label: 'Operaciones',
              data: [data.data.totalGastos, data.data.totalIngresos], // Usar valores correctos
              backgroundColor: ['#d12031', '#21923b'],
              borderColor: ['#d12031', '#21923b'],
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              x: {
                type: 'category', // Usar 'category' para mostrar etiquetas como 'Total Gastos' y 'Total Ingresos'
                position: 'bottom'
              },
              y: {
                type: 'linear',
                position: 'left'
              }
            }
          }
        });
      } else {
        console.error('No se pudo obtener el contexto del canvas');
      }
    } else {
      console.error('No se encontró el elemento canvas con id "graficoOperaciones"');
    }
  }
}
