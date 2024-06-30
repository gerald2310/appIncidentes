import { Component, OnInit, inject } from '@angular/core';
import { User } from 'firebase/auth';
import { map } from 'rxjs';
import { Incidencia } from 'src/app/models/incidencia.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddTecnicoComponent } from 'src/app/shared/component/add-tecnico/add-tecnico.component';

@Component({
  selector: 'app-asigna-incidencias',
  templateUrl: './asigna-incidencias.page.html',
  styleUrls: ['./asigna-incidencias.page.scss'],
})
export class AsignaIncidenciasPage implements OnInit {
  firebaseService = inject(FirebaseService);
  utilsService = inject(UtilsService);
  loading: boolean = false;
  incidencias: Incidencia[] = [];
  userLocal = {} as User;

  constructor() { }

  ngOnInit() {
    this.userLocal = this.user(); 
  }
  user(): User{
    return this.utilsService.getLocalStorage('user');
  }
  getIncidencia() {
      
    let path = `incidencia`;
   
    
    this.loading = true;

    let sub = this.firebaseService.getCollectionData(path)
      .snapshotChanges().pipe(
        map(changes => changes.map(c => ({
          id: c.payload.doc.id,
          ...c.payload.doc.data() 
        })))
      ).subscribe({
        next: (resp: any) => { 
          this.incidencias = resp;
          let filtro = this.incidencias;
          this.incidencias = this.incidencias.filter(filtro => filtro.estado == 1);
        //   let filtroFinal = this.incidencias;
        //   this.incidencias = this.incidencias.filter(filtro => filtro.diagnostico == false);
        //  console.log(this.incidencias);
          this.loading = false;
          sub.unsubscribe();
        }
      })
  }
  ionViewWillEnter() {
    this.getIncidencia();

  }
  doRefresh(event: any) {
    setTimeout(() => {
      this.getIncidencia()
      event.target.complete()
    }, 500)
  }
  async addTecnico(incidencia ?: Incidencia){
    console.log(incidencia);
        let modal = await this.utilsService.getModal({
          component: AddTecnicoComponent,
          cssClass: 'add-diagnostico-modal',
          componentProps: { incidencia }
     
        })
      }
    
}
