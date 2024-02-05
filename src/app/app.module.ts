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



@NgModule({
  declarations: [AppComponent,OperacionesComponent,OperacionComponent,EditarOperacionComponent, PeraltadaComponent],
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
