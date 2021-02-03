import { Injectable } from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import firebase from 'firebase';
import {map} from 'rxjs/operators';
import {forkJoin, from, Observable} from 'rxjs';
import {Reference} from '@angular/fire/storage/interfaces';
import FullMetadata = firebase.storage.FullMetadata;
import {AuthService} from '../../appCommon/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FileStorageService {

  constructor(
    private storage: AngularFireStorage,
    private authService: AuthService,

  ) { }


  getFiles$(): Observable<Reference[]> {
   return this.storage.ref(this.authService.currentUserId()).listAll().pipe(
     map(res => res.items)
   );
  }
  uploadFile(file): Observable<FullMetadata> {
    return from(
      firebase.storage()
        .ref()
        .child(`${this.authService.currentUserId()}/${file.name}`)
        .put(file)
        .then((a) => {
          return a.metadata;
        })
    );
  }
  uploadFiles(files: File[]): Observable<FullMetadata[]> {
    return forkJoin(
      files.map((file) => this.uploadFile(file))
    );
  }
}