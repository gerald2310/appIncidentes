import { Component, OnInit, inject } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';
import { Incidencia } from 'src/app/models/incidencia.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddDiagnosticoComponent } from 'src/app/shared/component/add-diagnostico/add-diagnostico.component';  

@Component({
  selector: 'app-rdiagnostico-incidencia',
  templateUrl: './rdiagnostico-incidencia.page.html',
  styleUrls: ['./rdiagnostico-incidencia.page.scss'],
})
export class RdiagnosticoIncidenciaPage implements OnInit {
  firebaseService = inject(FirebaseService);
  utilsService = inject(UtilsService);
  loading: boolean = false;
  incidencias: Incidencia[] = [];
  userLocal = {} as User;


  constructor() { }

  ngOnInit() {
    this.userLocal = this.user(); 
  }

  async addDiagnostico(incidencia ?: Incidencia){ 
    let modal = await this.utilsService.getModal({
      component: AddDiagnosticoComponent,
      cssClass: 'add-diagnostico-modal',
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
          this.incidencias = this.incidencias.filter(filtro => filtro.tecnico ==  this.user().uid);
          let filtroFinal = this.incidencias;
           this.incidencias = this.incidencias.filter(filtro => filtro.estado == 2);
         console.log(this.incidencias);
          this.loading = false;
          sub.unsubscribe();
        }
      })
  }
  user(): User{
    return this.utilsService.getLocalStorage('user');
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
  
}
