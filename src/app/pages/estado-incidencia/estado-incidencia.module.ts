import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstadoIncidenciaPageRoutingModule } from './estado-incidencia-routing.module';

import { EstadoIncidenciaPage } from './estado-incidencia.page';
import { SharedModule } from "../../shared/shared.module";

@NgModule({
    declarations: [EstadoIncidenciaPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        EstadoIncidenciaPageRoutingModule,
        SharedModule
    ]
})
export class EstadoIncidenciaPageModule {}
