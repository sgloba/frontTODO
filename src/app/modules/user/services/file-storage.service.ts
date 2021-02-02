import { Injectable } from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import firebase from 'firebase';
import {map} from 'rxjs/operators';
import {from, Observable} from 'rxjs';
import {Reference} from '@angular/fire/storage/interfaces';
import FullMetadata = firebase.storage.FullMetadata;

@Injectable({
  providedIn: 'root'
})
export class FileStorageService {

  constructor(
    private storage: AngularFireStorage,
  ) { }

  private get currentUserId(): string {
     return  firebase.auth().currentUser.uid;
  }
  getFiles$(): Observable<Reference[]> {
   return this.storage.ref(this.currentUserId).listAll().pipe(
     map(res => res.items)
   );
  }
  uploadFiles(file): Observable<FullMetadata> {
    return from(
      firebase.storage()
        .ref()
        .child(`${this.currentUserId}/${file.name}`)
        .put(file)
        .then((a) => {
          return a.metadata;
        })
    );
  }
}
