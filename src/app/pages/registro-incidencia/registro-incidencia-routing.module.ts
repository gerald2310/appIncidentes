import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroIncidenciaPage } from './registro-incidencia.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroIncidenciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroIncidenciaPageRoutingModule {}
