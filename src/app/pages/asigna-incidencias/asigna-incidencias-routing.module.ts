import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsignaIncidenciasPage } from './asigna-incidencias.page';

const routes: Routes = [
  {
    path: '',
    component: AsignaIncidenciasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsignaIncidenciasPageRoutingModule {}
