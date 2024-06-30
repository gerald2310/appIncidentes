import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OlvidarContrasennaPageRoutingModule } from './olvidar-contrasenna-routing.module';

import { OlvidarContrasennaPage } from './olvidar-contrasenna.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OlvidarContrasennaPageRoutingModule
  ],
  declarations: [OlvidarContrasennaPage]
})
export class OlvidarContrasennaPageModule {}
