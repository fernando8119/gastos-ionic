import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OperacionComponent } from './pages/operacion/operacion.component';
import { OperacionesComponent } from './pages/operaciones/operaciones.component';
import { EditarOperacionComponent } from './pages/editar-operacion/editar-operacion.component';


const routes: Routes = [
  { path: 'operaciones', component: OperacionesComponent },
  { path: 'operacion/:id', component: OperacionComponent },
  { path: 'editar-operacion/:id', component: EditarOperacionComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'operaciones' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}