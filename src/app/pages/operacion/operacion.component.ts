import { Component, OnInit } from '@angular/core';
import { Operacion } from 'src/app/models/operacion';
import { OperacionesService } from 'src/app/services/operaciones.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CategoriasService } from '../../services/categorias.service';
import { Categoria } from 'src/app/models/categoria'

@Component({
  selector: 'app-operacion',
  templateUrl: './operacion.component.html',
  styleUrls: ['./operacion.component.scss'],
})
export class OperacionComponent implements OnInit {
  nuevaOperacion: Operacion = {

   descripcion: '',
   cantidad:  0,
   categoria: '',
    fecha: '',


  };

  resultadoOperacion: string = '';
  categorias: Categoria[] = [];

  constructor(private operacionesService: OperacionesService,
    private categoriasService: CategoriasService,
    private route: ActivatedRoute,
    private router: Router) {

    this.categoriasService.obtenerCategorias().subscribe((categorias: any) => {
      this.categorias = categorias;
    });

  }



  ngOnInit(): void {

    }


  guardar(forma: NgForm) {

    Swal.fire({
      title: "Operación añadida",
      icon: "success"
    });

    this.operacionesService
  .agregarOperaciones(this.nuevaOperacion)
  .subscribe((resultado: string) => {
    console.log(resultado);
    this.resultadoOperacion = resultado;
    this.router.navigate(['operacion/']);
  });
  }



}




