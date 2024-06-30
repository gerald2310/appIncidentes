import { formatDate } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { map } from 'rxjs/internal/operators/map';
import { Diagnostico } from 'src/app/models/diagnostico.model';
import { Incidencia } from 'src/app/models/incidencia.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-add-diagnostico',
  templateUrl: './add-diagnostico.component.html',
  styleUrls: ['./add-diagnostico.component.scss'],
})
export class AddDiagnosticoComponent  implements OnInit {
  @Input() incidencia: Incidencia;
  
  firebaseService = inject(FirebaseService);
  utilsService = inject(UtilsService);
  loading: boolean = false;

  diagnosticoObj = {} as Diagnostico;
  
  incidencias: Incidencia[] = [];
  incidenciaUpt = {} as Incidencia;
  

  formd = new FormGroup({
    codigoI: new FormControl('',[Validators.required]),
    diagnostico: new FormControl('',[Validators.required]),
    fechaHora: new FormControl(''),
    tiempo:new FormControl(null, [Validators.required, Validators.min(0)]),
    compra: new FormControl(null, [Validators.required, Validators.min(0)]),
    tecnico:new FormControl(''),
    })
  constructor() { }

  ngOnInit() {
    this.diagnosticoObj.codigoI = this.incidencia.codigoI;
    this.diagnosticoObj.tiempo = null;
    this.diagnosticoObj.compra = null;
    this.diagnosticoObj.diagnostico = ''; 
    this.diagnosticoObj.fechaHora = '';  
    this.diagnosticoObj.tecnico = '';
    if(this.diagnosticoObj) this.formd.setValue(this.diagnosticoObj);
    
     
  }
  async submit(){
    if(this.formd.valid){
     this.createDiagnostico(); 
     this.updateIncidencia();
    }
  }
  setNumberInput() {
    let { tiempo } = this.formd.controls;
    if(tiempo.value) tiempo.setValue((tiempo.value));
  }

  user(): User{
    return this.utilsService.getLocalStorage('user');
  }
  ionViewWillEnter() {
    this.getIncidencia();
  }
  getIncidencia() {
      
    let path = `users/${this.user().uid}/incidencia`;
   
    
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
          this.incidencias = this.incidencias.filter(filtro => filtro.estado == 2); 

          this.loading = false;
          sub.unsubscribe();
        }
      })
  }
  async createDiagnostico(){

    let path = `diagnostico`;
    
 
    
     let fecha = formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss', 'en-US');
     let strFecha = fecha + "";
     this.formd.value.tecnico = this.user().name;
     this.formd.value.fechaHora = strFecha;
     this.formd.value.compra = (this.formd.value.compra != '0')?true:false;
     this.formd.value.tecnico = this.user().uid;
 
    
    this.firebaseService.addDocument(path, this.formd.value)
    .then( async resp => {
      
      this.utilsService.dismisModal( {success: true});
      this.utilsService.presentToast({
        message: 'Diagnostico creado exitosamente',
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
        duration: 2500,
        icon: 'alert-circle-outline'
    }) 
  }).finally(() =>{
    location.reload();
  })
  }
  async updateIncidencia() {
    let enlace = `incidencia/${this.incidencia.id}`;

    this.incidenciaUpt = this.incidencia;
    this.incidenciaUpt.estado = 6;
 //   this.incidenciaUpt.diagnostico = true; REVISAR

    this.firebaseService.updateDocumentCode(enlace, this.incidenciaUpt);
     
  }

}
