import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RdiagnosticoIncidenciaPage } from './rdiagnostico-incidencia.page';

const routes: Routes = [
  {
    path: '',
    component: RdiagnosticoIncidenciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RdiagnosticoIncidenciaPageRoutingModule {}
