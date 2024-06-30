import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsignaIncidenciasPageRoutingModule } from './asigna-incidencias-routing.module';

import { AsignaIncidenciasPage } from './asigna-incidencias.page';
import { SharedModule } from "../../shared/shared.module";

@NgModule({
    declarations: [AsignaIncidenciasPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AsignaIncidenciasPageRoutingModule,
        SharedModule
    ]
})
export class AsignaIncidenciasPageModule {}
