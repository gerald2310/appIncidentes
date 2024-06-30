import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstadoIncidenciaPage } from './estado-incidencia.page';

const routes: Routes = [
  {
    path: '',
    component: EstadoIncidenciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstadoIncidenciaPageRoutingModule {}
