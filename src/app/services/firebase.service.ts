import { Injectable, inject } from '@angular/core';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { User } from '../models/user.model';
import { addDoc, collection,  doc, getDoc, getFirestore, setDoc, updateDoc } from '@angular/fire/firestore';
import { UtilsService } from './utils.service';
import { Incidencia } from '../models/incidencia.model';
import { Codigo } from '../models/codigo.model';
import { Diagnostico } from '../models/diagnostico.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  keyCode = 'codigos';

  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);
  utilsService = inject(UtilsService);
  dataRef: AngularFirestoreCollection<Incidencia>;
  dataCod: AngularFirestoreCollection<Codigo>;
  dataUsr: AngularFirestoreCollection<User>;
  dataDiag: AngularFirestoreCollection<Diagnostico>;
    

  getAuth(){
    return getAuth();
  }
  login(user: User){
    return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  }
  exitLogin(user: User) {
    return createUserWithEmailAndPassword(getAuth(),  user.email, user.password);
  }
  setDocument(path: any, data: any) {
    return setDoc(doc(getFirestore(), path), data);
  }

  async getDocument(path: string) {
    return (await getDoc(doc(getFirestore(), path))).data();
  }
  

  async salirSesion(){
    getAuth().signOut();
    localStorage.removeItem('user');
    this.utilsService.routerlink('/auth');
  }
  addDocument(path: any, data: any){ //users/id/Incidencia
    return addDoc(collection(getFirestore(),path), data) //add guarda los datos

  }
  updateDocument(path: any, data: any) {
    return updateDoc(doc(getFirestore(), path), data);
  }
  updateUser(displayName: any) {
    return updateProfile(getAuth().currentUser, {displayName} );
  }
  getCollectionData(path: any): AngularFirestoreCollection<Incidencia> {
    
    this.dataRef = this.firestore.collection(path, ref => ref.orderBy('codigoI', 'desc'))
    return this.dataRef;
  }
  getCollectionCode(path: any): AngularFirestoreCollection<Codigo> {
    //path = (path=='codigo')?this.keyCode:path;
    console.log(path);
    this.dataCod = this.firestore.collection(path, ref => ref.orderBy('anno', 'asc'))
    return this.dataCod;
  }
  getCollectionUsers(path: any): AngularFirestoreCollection<User> {
    
    this.dataUsr = this.firestore.collection(path, ref => ref.orderBy('name', 'asc'))
    return this.dataUsr;
  }
  getCollectionDianostico(path: any): AngularFirestoreCollection<Diagnostico> {
    
    this.dataDiag = this.firestore.collection(path, ref => ref.orderBy('codigoI', 'asc'))
    return this.dataDiag;
  }
  updateDocumentCode(path: any, data: any) {
    return updateDoc(doc(getFirestore(), path), data);
  }
}
