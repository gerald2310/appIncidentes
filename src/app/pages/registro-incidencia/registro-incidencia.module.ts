import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroIncidenciaPageRoutingModule } from './registro-incidencia-routing.module';

import { RegistroIncidenciaPage } from './registro-incidencia.page';
import { SharedModule } from "../../shared/shared.module";

@NgModule({
    declarations: [RegistroIncidenciaPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RegistroIncidenciaPageRoutingModule,
        SharedModule
    ]
})
export class RegistroIncidenciaPageModule {}
