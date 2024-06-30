import { formatDate } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { Incidencia } from 'src/app/models/incidencia.model';

import { User } from 'src/app/models/user.model';

import { Codigo } from 'src/app/models/codigo.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
@Component({
  selector: 'app-add-tecnico',
  templateUrl: './add-tecnico.component.html',
  styleUrls: ['./add-tecnico.component.scss'],
})
export class AddTecnicoComponent  implements OnInit {
  @Input() incidencia: Incidencia;
  
  firebaseService = inject(FirebaseService);
  utilsService = inject(UtilsService);
  loading: boolean = false; 
  tecnicos: User[] = [];
  incidenciaUpt = {} as Incidencia;

  formt = new FormGroup({ 
    tecnico:new FormControl('',[Validators.required]),
    })

  constructor() { }

  ngOnInit() {
    this.getTenicos();
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
  async updateIncidencia() {
    let enlace = `incidencia/${this.incidencia.id}`;

    this.incidenciaUpt = this.incidencia;
    this.incidenciaUpt.estado = 2; 
    this.incidencia.tecnico = this.formt.value.tecnico;

    this.firebaseService.updateDocumentCode(enlace, this.incidenciaUpt)
    .then( async resp =>{
      this.utilsService.dismisModal( {success: true});
      this.utilsService.presentToast({
        message: `Incidencia asignada al técnico ${this.tecnicos.find(x =>x.uid ==  this.formt.value.tecnico).name}`,
        duration: 1500,
        color: 'success',
        position: 'bottom',
        icon: 'checkmark-circle-outline'
      })
 
    }).catch(error =>{ 
      this.utilsService.presentToast({
        message: error.message,
        color: 'danger',
        position: 'bottom',
        duration: 2500,
        icon: 'alert-circle-outline'
    }) 
  }).finally(() =>{
    location.reload();
    });
    
     
  }
  async submit(){
     
     this.updateIncidencia();
    }
}

