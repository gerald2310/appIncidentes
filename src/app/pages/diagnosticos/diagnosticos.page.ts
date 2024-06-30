import { Component, OnInit, inject } from '@angular/core';
import { map } from 'rxjs';
import { Diagnostico } from 'src/app/models/diagnostico.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-diagnosticos',
  templateUrl: './diagnosticos.page.html',
  styleUrls: ['./diagnosticos.page.scss'],
})
export class DiagnosticosPage implements OnInit {
  firebaseService = inject(FirebaseService);
  utilsService = inject(UtilsService);
  loading: boolean = false;
  diagnostiscos: Diagnostico[] = [];
  tecnicos: User[] = [];

  constructor() { }

  ngOnInit() {
    this.getTenicos();
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
          
	let filtro = this.diagnostiscos.filter(x => x.tecnico == this.user().uid);
        this.diagnostiscos = filtro; 
          
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
user(): User{
  return this.utilsService.getLocalStorage('user');
  }
}