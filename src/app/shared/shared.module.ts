import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginInputComponent } from './component/login-input/login-input.component';
import { HeaderComponent } from './component/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AddIncidenciaComponent } from './component/add-incidencia/add-incidencia.component';
import { AddDiagnosticoComponent } from './component/add-diagnostico/add-diagnostico.component';
import { AddTecnicoComponent } from './component/add-tecnico/add-tecnico.component';
import { AddEstadoIComponent } from './component/add-estado-i/add-estado-i.component';



@NgModule({
  declarations: [
    LoginInputComponent,
    HeaderComponent,
    AddIncidenciaComponent,
    AddDiagnosticoComponent,
    AddTecnicoComponent,
    AddEstadoIComponent
  ],exports:[
    LoginInputComponent,
    HeaderComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class SharedModule { }
