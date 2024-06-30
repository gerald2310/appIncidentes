import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { initializeApp} from 'firebase/app';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';


//conexion
const firebaseConfig = {
  apiKey: "AIzaSyDC_DXWH-9HAZLBm4ibOPNa53zfFI_PQP4",
  authDomain: "appincidencias-c4421.firebaseapp.com",
  projectId: "appincidencias-c4421",
  storageBucket: "appincidencias-c4421.appspot.com",
  messagingSenderId: "131286866936",
  appId: "1:131286866936:web:7e6d2626ac816153cc940d"
};

const app = initializeApp(firebaseConfig);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot({ mode: 'md' }), 
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
function provideAuth(arg0: () => import("@firebase/auth").Auth): any[] | import("@angular/core").Type<any> | import("@angular/core").ModuleWithProviders<{}> {
  throw new Error('Function not implemented.');
}

function getDatabase() {
  throw new Error('Function not implemented.');
}

function provideFunctions(arg0: () => any): any[] | import("@angular/core").Type<any> | import("@angular/core").ModuleWithProviders<{}> {
  throw new Error('Function not implemented.');
}

function provideMessaging(arg0: () => any): any[] | import("@angular/core").Type<any> | import("@angular/core").ModuleWithProviders<{}> {
  throw new Error('Function not implemented.');
}

function getMessaging() {
  throw new Error('Function not implemented.');
}

function provideRemoteConfig(arg0: () => any): any[] | import("@angular/core").Type<any> | import("@angular/core").ModuleWithProviders<{}> {
  throw new Error('Function not implemented.');
}

function getRemoteConfig() {
  throw new Error('Function not implemented.');
}

function provideStorage(arg0: () => any): any[] | import("@angular/core").Type<any> | import("@angular/core").ModuleWithProviders<{}> {
  throw new Error('Function not implemented.');
}

function getStorage() {
  throw new Error('Function not implemented.');
}

