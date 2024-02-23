import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OperacionComponent } from './pages/operacion/operacion.component';
import { OperacionesComponent } from './pages/operaciones/operaciones.component';
import { EditarOperacionComponent } from './pages/editar-operacion/editar-operacion.component';
import { PeraltadaComponent } from './pages/menu/peraltada.component';
import { GastosComponent } from './pages/footer/gastos/gastos.component';
import { PresupuestoComponent } from './pages/footer/presupuesto/presupuesto.component';
import { GraficaComponent } from './pages/footer/grafica/grafica.component';


const routes: Routes = [
  { path: 'operaciones', component: OperacionesComponent },
  { path: 'operacion/:id', component: OperacionComponent },
  { path: 'editar-operacion/:id', component: EditarOperacionComponent },
  { path: 'folder/peraltada', component: PeraltadaComponent },
  { path: 'folder/gastos', component: GastosComponent},
  { path: 'folder/grafica', component: GraficaComponent},
  { path: 'folder/presupuesto', component: PresupuestoComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'operaciones' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
