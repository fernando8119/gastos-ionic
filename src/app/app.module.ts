import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouteReuseStrategy } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { OperacionesComponent } from './pages/operaciones/operaciones.component';
import { OperacionComponent } from './pages/operacion/operacion.component';
import { EditarOperacionComponent } from './pages/editar-operacion/editar-operacion.component';
import { PeraltadaComponent } from './pages/menu/peraltada.component';
import { OperacionesFooterComponent } from './pages/footer/operacionesFooter/operacionesFooter.component';
import { GastosComponent } from './pages/footer/gastos/gastos.component';
import { GraficaComponent } from './pages/footer/grafica/grafica.component';
import { PresupuestoComponent } from './pages/footer/presupuesto/presupuesto.component';



@NgModule({
  declarations: [AppComponent,OperacionesComponent,OperacionComponent,EditarOperacionComponent, PeraltadaComponent, OperacionesFooterComponent, GastosComponent, GraficaComponent, PresupuestoComponent],
  imports: [

    BrowserModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    AppRoutingModule

  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy}, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
