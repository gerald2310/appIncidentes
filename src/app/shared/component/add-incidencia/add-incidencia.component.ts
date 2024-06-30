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
  selector: 'app-add-incidencia',
  templateUrl: './add-incidencia.component.html',
  styleUrls: ['./add-incidencia.component.scss'],
})
export class AddIncidenciaComponent  implements OnInit {
  @Input() incidencia: Incidencia;

  firebaseService = inject(FirebaseService);
  utilsService = inject(UtilsService);
  loading: boolean = false;
  incidencias: Incidencia[] = [];
  user= {} as User;
  codigos: Codigo[] = [];
  consecutivo: string = "";
  anno: string = "";
  codigoFinal: string = "";
  codigoUpt = {} as Codigo;

  formu = new FormGroup({
    id: new FormControl(''), 
    fechaHora: new FormControl(''),
    usuario: new FormControl(''), 
    codigoI: new FormControl(''),
    titulo: new FormControl('',[Validators.required]),
    lugar: new FormControl('',[Validators.required]),
    descripcion: new FormControl('',[Validators.required]),
    tecnico:new FormControl(''),
    estado: new FormControl(0),
    //diagnostico:new FormControl({value:false, disabled: true}),
    
 })
 

  ngOnInit() {
     this.getCodigo();
     
    this.user = this.utilsService.getLocalStorage('user');
    if(this.incidencia) this.formu.setValue(this.incidencia)
  }
  userLocal(): User{
    return this.utilsService.getLocalStorage('user');
    }
  async submit(){
    if(this.formu.valid){
     this.createIncidencia();
     this.updateCode();
    }
  }
  async createIncidencia(){

    let path = `incidencia`;
    
    this.formu.value.usuario = this.user.name;
    
     let fecha = formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss', 'en-US');
     let strFecha = fecha + "";

    this.formu.value.fechaHora = strFecha;
    this.formu.value.codigoI = this.codigoFinal;
    this.formu.value.estado = 1;
    delete this.formu.value.id;
    
    this.firebaseService.addDocument(path, this.formu.value)
    .then( async resp => {
      
      this.utilsService.dismisModal( {success: true});
      this.utilsService.presentToast({
        message: 'Incidencia creada exitosamente',
        color: 'tertiary',
        position: 'bottom',
        duration: 1500,
        icon: 'checkmark-circle-outline'
      });

    
    }).catch(error =>{ 
      this.utilsService.presentToast({
        message: error.message,
        color: 'danger',
        position: 'bottom',
        duration: 5000,
        icon: 'alert-circle-outline'
    }) 
  }).finally(() =>{
    location.reload();
  })
  }
  getCodigo() {
      
    let path = `codigos`;
    this.loading = true;

    let sub = this.firebaseService.getCollectionCode(path)
      .snapshotChanges().pipe(
        map(changes => changes.map(c => ({
          id: c.payload.doc.id,
          ...c.payload.doc.data() 
        })))
      ).subscribe({
        next: (resp: any) => { 

         this.codigos = resp;
         this.consecutivo = (parseInt(this.codigos[0].consecutivo) + 1) + "";
         this.anno = this.codigos[0].anno; 

         let fecha = formatDate(new Date(), 'yyyy', 'en-US');
         let anno = fecha + "";



         if(anno != this.anno){
            this.anno = anno;
            this.consecutivo = "1";
           
            
         }
         this.codigos[0].consecutivo = this.consecutivo;
         this.codigos[0].anno = this.anno;
         this.codigoFinal = this.anno + "-" + this.consecutivo;
         
        }
      })
  }
  
  async updateCode() {
    let enlace = `codigos/5QmEbT9rnesldNvPhdhY`;

    this.codigoUpt.consecutivo = this.consecutivo;
    
    this.codigoUpt.anno = this.anno;
    
    this.firebaseService.updateDocumentCode(enlace, this.codigoUpt);
     
  }
  
}
