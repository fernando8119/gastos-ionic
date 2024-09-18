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
  private chartBar: Chart<'bar'> | null = null; // Gráfico de barras
  private chartIngresos: Chart<'pie'> | null = null; // Gráfico de pastel para ingresos
  private chartGastos: Chart<'pie'> | null = null; // Gráfico de pastel para gastos

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
    const ctxBar = document.getElementById('graficoOperaciones') as HTMLCanvasElement;
    const ctxIngresos = document.getElementById('graficoIngresos') as HTMLCanvasElement;
    const ctxGastos = document.getElementById('graficoGastos') as HTMLCanvasElement;

    if (ctxBar && ctxIngresos && ctxGastos) {
      const contextBar = ctxBar.getContext('2d');
      const contextIngresos = ctxIngresos.getContext('2d');
      const contextGastos = ctxGastos.getContext('2d');

      // Convertir desgloseIngresos y desgloseGastos en arrays
      const desgloseIngresos = data.data.desgloseIngresos;
      const desgloseGastos = data.data.desgloseGastos;

      // Obtener las categorías (keys) y cantidades (values), asegurándonos de que las cantidades son números
      const labelsIngresos = Object.keys(desgloseIngresos);
      const valoresIngresos: number[] = Object.values(desgloseIngresos).map((v: any) => Number(v));

      const labelsGastos = Object.keys(desgloseGastos);
      const valoresGastos: number[] = Object.values(desgloseGastos).map((v: any) => Number(v));

      // Destruir los gráficos existentes si es necesario
      if (this.chartBar) {
        this.chartBar.destroy();
      }
      if (this.chartIngresos) {
        this.chartIngresos.destroy();
      }
      if (this.chartGastos) {
        this.chartGastos.destroy();
      }

      // Crear gráfico de barras de operaciones totales (gastos e ingresos)
      if (contextBar) {
        this.chartBar = new Chart(contextBar, {
          type: 'bar',
          data: {
            labels: ['Total Gastos', 'Total Ingresos'],
            datasets: [{
              label: 'Operaciones',
              data: [data.data.resultado.totalGastos, data.data.resultado.totalIngresos],
              backgroundColor: ['#d12031', '#21923b'],
              borderColor: ['#d12031', '#21923b'],
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              x: { type: 'category', position: 'bottom' },
              y: { type: 'linear', position: 'left' }
            }
          }
        });
      }

      // Crear gráfico de pastel de ingresos
      if (contextIngresos) {
        this.chartIngresos = new Chart(contextIngresos, {
          type: 'pie',
          data: {
            labels: labelsIngresos,
            datasets: [{
              label: 'Ingresos',
              data: valoresIngresos, // Asegurado de que sea un array de números
              backgroundColor: ['#ffcd56', '#ff6384', '#36a2eb', '#4bc0c0'], // Colores personalizados
              hoverOffset: 4
            }]
          }
        });
      }

      // Crear gráfico de pastel de gastos
      if (contextGastos) {
        this.chartGastos = new Chart(contextGastos, {
          type: 'pie',
          data: {
            labels: labelsGastos,
            datasets: [{
              label: 'Gastos',
              data: valoresGastos, // Asegurado de que sea un array de números
              backgroundColor: ['#ffcd56', '#ff6384', '#36a2eb', '#4bc0c0'], // Colores personalizados
              hoverOffset: 4
            }]
          }
        });
      }
    } else {
      console.error('No se encontró el canvas para alguno de los gráficos');
    }
  }
}
