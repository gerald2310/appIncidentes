import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

   firebaseService = inject(FirebaseService);
   utilsService = inject(UtilsService);

  form = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required]),
  });

  constructor() { }

  ngOnInit() {
  }

  async getUserInfo(uid: string) {
    if (this.form.valid) {
      

      let path = `users/${uid}`;
      this.firebaseService.getDocument(path)
        .then((user: User) => {

          this.utilsService.saveLocalStorage('user', user);
          this.utilsService.routerlink('home');
          this.form.reset();

          this.utilsService.presentToast({
            message: `Bienvenido ${user.name}`,
            duration: 1500,
            color: 'success',
            position: 'bottom',
            icon: 'person-circle-outline'
          })

        }).catch(error => {
          console.log(error);
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
  async submit() {
    if (this.form.valid) {
      

      this.firebaseService.login(this.form.value as User)
        .then(resp => {
          //console.log(resp);
          this.getUserInfo(resp.user.uid);

        }).catch(error => {
          console.log(error);
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
 
  
}
