import { Component, OnInit, inject } from '@angular/core';
import { map } from 'rxjs';
import { Incidencia } from 'src/app/models/incidencia.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddIncidenciaComponent } from 'src/app/shared/component/add-incidencia/add-incidencia.component';

@Component({
  selector: 'app-registro-incidencia',
  templateUrl: './registro-incidencia.page.html',
  styleUrls: ['./registro-incidencia.page.scss'],
})
export class RegistroIncidenciaPage implements OnInit {

  firebaseService = inject(FirebaseService);
  utilsService = inject(UtilsService);
  loading: boolean = false;
  incidencias: Incidencia[] = [];

  ngOnInit() {
   
  }
  ionViewWillEnter() {
    this.getIncidencia();
  }
user(): User{
  return this.utilsService.getLocalStorage('user');
}
    async addIncidencia(incidencia ?: Incidencia){
    
      let modal = await this.utilsService.getModal({
        component: AddIncidenciaComponent,
        cssClass: 'add-incidencia-modal',
        componentProps: { incidencia }
      })
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
            this.incidencias = this.incidencias.filter(filtro => filtro.usuario == this.user().name);
            this.loading = false;
            console.log(this.incidencias);
            sub.unsubscribe();
          }
        })
    }
    doRefresh(event: any) {
      setTimeout(() => {
        this.getIncidencia()
        event.target.complete()
      }, 1000)
    }

}
