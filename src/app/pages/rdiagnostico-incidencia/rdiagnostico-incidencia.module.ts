import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RdiagnosticoIncidenciaPageRoutingModule } from './rdiagnostico-incidencia-routing.module';

import { RdiagnosticoIncidenciaPage } from './rdiagnostico-incidencia.page';
import { SharedModule } from "../../shared/shared.module";

@NgModule({
    declarations: [RdiagnosticoIncidenciaPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RdiagnosticoIncidenciaPageRoutingModule,
        SharedModule
    ]
})
export class RdiagnosticoIncidenciaPageModule {}
