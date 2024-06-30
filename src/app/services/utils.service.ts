import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController, ModalOptions, ToastController, ToastOptions } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  router = inject(Router);
  toastCtrl = inject(ToastController);
  loadingCtrl = inject(LoadingController);
  modalCtrl = inject(ModalController);

  routerlink(url: any) {
    this.router.navigateByUrl(url)
  }
  
  async presentToast(opts?: ToastOptions) {
    const toast = await this.toastCtrl.create(opts);

    toast.present();
  }
  
  // loading() {
  //   return this.loadingCtrl.create({ spinner: 'crescent' })
  // }
  saveLocalStorage(key: string, value: any) {
    return localStorage.setItem(key, JSON.stringify(value))
  }
  
  getLocalStorage(key : string) {
    return JSON.parse(localStorage.getItem(key));
  }
  async getModal(opts: ModalOptions){
    const modal = await this.modalCtrl.create(opts)
     await modal.present();

    const { data } =  await modal.onWillDismiss();
    if(data) return data;
  }
  dismisModal(data?: any){
    return this.modalCtrl.dismiss(data);
  }
}
