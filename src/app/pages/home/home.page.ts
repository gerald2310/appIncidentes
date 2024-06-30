import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  router = inject(Router);
  firebaseService = inject(FirebaseService);
  utilsService = inject(UtilsService);

  userLocal = {} as User;
  rol: number = 0;

  currentPath: string = '';

  ngOnInit(){
    this.userLocal = this.user();
    this.rol = (this.userLocal.rol != null)?this.userLocal.rol:0;
   
  }

  user(): User{
    return this.utilsService.getLocalStorage('user');
    }
    async cerrarSession(user: User){
      this.firebaseService.salirSesion()
      .then(resp => {
         
        this.utilsService.presentToast({
          message:`Hasta pronto ${user.name}`,
          duration: 2500,
          color: 'danger',
          position: 'bottom',
          icon: 'hand-left-outline'
        })
  
      }).catch(error => {
         
        this.utilsService.presentToast({
          message: error.message,
          duration: 2500,
          color: 'danger',
          position: 'bottom',
          icon: 'alert-circle-outline'
        })
      }).finally(() => {
        
      })
    }


}
