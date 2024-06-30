import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiagnosticosPageRoutingModule } from './diagnosticos-routing.module';

import { DiagnosticosPage } from './diagnosticos.page';
import { SharedModule } from "../../shared/shared.module";

@NgModule({
    declarations: [DiagnosticosPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        DiagnosticosPageRoutingModule,
        SharedModule
    ]
})
export class DiagnosticosPageModule {}
