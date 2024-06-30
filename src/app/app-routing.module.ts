import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'registro-incidencia',
    loadChildren: () => import('./pages/registro-incidencia/registro-incidencia.module').then( m => m.RegistroIncidenciaPageModule)
  },
  {
    path: 'rdiagnostico-incidencia',
    loadChildren: () => import('./pages/rdiagnostico-incidencia/rdiagnostico-incidencia.module').then( m => m.RdiagnosticoIncidenciaPageModule)
  },
  {
    path: 'diagnosticos',
    loadChildren: () => import('./pages/diagnosticos/diagnosticos.module').then( m => m.DiagnosticosPageModule)
  },
  {
    path: 'asigna-incidencias',
    loadChildren: () => import('./pages/asigna-incidencias/asigna-incidencias.module').then( m => m.AsignaIncidenciasPageModule)
  },
  {
    path: 'estado-incidencia',
    loadChildren: () => import('./pages/estado-incidencia/estado-incidencia.module').then( m => m.EstadoIncidenciaPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
