import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { Diagnostico } from 'src/app/models/diagnostico.model';
import { Incidencia } from 'src/app/models/incidencia.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-add-estado-i',
  templateUrl: './add-estado-i.component.html',
  styleUrls: ['./add-estado-i.component.scss'],
})
export class AddEstadoIComponent  implements OnInit {
  @Input() diagnostico: Diagnostico;
  
  incidenciaUpt = {} as Incidencia;
  incidencias: Incidencia[] = [];

  firebaseService = inject(FirebaseService);
  utilsService = inject(UtilsService);
  loading: boolean = false; 
  form = new FormGroup({
     
    estado:new FormControl(null,[Validators.required]),
    })
  constructor() { }

  ngOnInit() {
    this.getIncidencia();
  }
  async updateIncidencia() {
    let enlace = `incidencia/${this.incidenciaUpt.id}`;
    console.log(enlace);
    this.incidenciaUpt.estado = this.form.value.estado; 
     

    this.firebaseService.updateDocumentCode(enlace, this.incidenciaUpt)
    .then( async resp =>{
      this.utilsService.dismisModal( {success: true});
      this.utilsService.presentToast({
        message: `Estado asignado al técnico ${this.incidenciaUpt.codigoI}`,
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
          this.incidencias = this.incidencias.filter(filtro => filtro.codigoI ==  this.diagnostico.codigoI);
          this.incidenciaUpt = this.incidencias[0];
          this.loading = false;
          sub.unsubscribe();
        }
      })
  }
  user(): User{
    return this.utilsService.getLocalStorage('user');
  }

}
