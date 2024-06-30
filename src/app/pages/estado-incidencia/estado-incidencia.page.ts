import { Component, OnInit, inject } from '@angular/core';
import { map } from 'rxjs';
import { Diagnostico } from 'src/app/models/diagnostico.model';
import { Incidencia } from 'src/app/models/incidencia.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddEstadoIComponent } from 'src/app/shared/component/add-estado-i/add-estado-i.component';

@Component({
  selector: 'app-estado-incidencia',
  templateUrl: './estado-incidencia.page.html',
  styleUrls: ['./estado-incidencia.page.scss'],
})
export class EstadoIncidenciaPage implements OnInit {
  firebaseService = inject(FirebaseService);
  utilsService = inject(UtilsService);

  loading: boolean = false;

  diagnostiscos: Diagnostico[] = [];
  tecnicos: User[] = [];
  incidencias: Incidencia[] = [];
  
  incidenciasFiltro: Diagnostico[] = [];

  constructor() { }

  ngOnInit() {
    this.getTenicos();
    this.getIncidencia();
    this.getDiagnostico();
  }
  getDiagnostico() {
      
    let path = `diagnostico`;
   
    
    this.loading = true;

    let sub = this.firebaseService.getCollectionData(path)
      .snapshotChanges().pipe(
        map(changes => changes.map(c => ({
          id: c.payload.doc.id,
          ...c.payload.doc.data() 
        })))
      ).subscribe({
        next: (resp: any) => { 
          this.diagnostiscos = resp;
          
          for (let i = 0; i < this.incidencias.length; i++) {
            console.log("este objeto es:"+this.incidencias[i].estado);
            if (this.incidencias[i].estado == 6) {
               for (let k = 0; k < this.diagnostiscos.length; k++) {
                this.diagnostiscos[k].codigoI;
                if (this.diagnostiscos[k].codigoI == this.incidencias[i].codigoI) {
                  console.log(this.incidencias);
                  this.incidenciasFiltro.push(this.diagnostiscos[k]);
                }
               }
            }
            
          }

         this.diagnostiscos = this.incidenciasFiltro;

          for (let index = 0; index < this.diagnostiscos.length; index++) {


            for (let j = 0; j < this.tecnicos.length; j++) { 
                if (this.diagnostiscos[index].tecnico == this.tecnicos[j].uid) {

                  this.diagnostiscos[index].tecnico = this.tecnicos[j].name; 

                }
            }
            
          }
          this.loading = false; 
          sub.unsubscribe();
        }
      })
  } 
  getTenicos() {
    let path = `users`;
    this.loading = true;

    let sub = this.firebaseService.getCollectionUsers(path)
      .snapshotChanges().pipe(
        map(changes => changes.map(c => ({
          id: c.payload.doc.id,
          ...c.payload.doc.data() 
        })))
      ).subscribe({
        next: (resp: any) => { 

          this.tecnicos = resp;
          let filtro = this.tecnicos;
          this.tecnicos = this.tecnicos.filter(filtro => filtro.rol == 4);
      
        }
      })
  }
  
  async addEstado(diagnostico ?: Diagnostico){ 
    let modal = await this.utilsService.getModal({
      component: AddEstadoIComponent,
      cssClass: 'add-estado-i-modal',
      componentProps: { diagnostico }
 
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
          this.incidencias = this.incidencias.filter(filtro => filtro.estado == 6);
          this.loading = false;
          
          sub.unsubscribe();
        }
      })
  }
}
