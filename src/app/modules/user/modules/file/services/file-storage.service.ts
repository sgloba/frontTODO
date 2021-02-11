import {Injectable} from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import firebase from 'firebase';
import {map} from 'rxjs/operators';
import {forkJoin, from, Observable} from 'rxjs';
import {Reference} from '@angular/fire/storage/interfaces';
import FullMetadata = firebase.storage.FullMetadata;
import {AuthService} from '../../../../appCommon/services/auth.service';
import {Store} from '@ngrx/store';
import {fetchFilesStart} from '../../../store/actions/files.actions';


@Injectable({
  providedIn: 'root'
})
export class FileStorageService {

  constructor(
    private storage: AngularFireStorage,
    private authService: AuthService,
    private store: Store,
  ) {
  }

  requestFiles(): void {
    this.store.dispatch(fetchFilesStart());
  }

  getDownloadUrl$(filename): Observable<string> {
    return this.storage.ref(`${this.authService.currentUserId()}/${filename}`).getDownloadURL();
  }

  getFiles$(): Observable<Reference[]> {
    return this.storage.ref(this.authService.currentUserId()).listAll().pipe(
      map(res => res.items)
    );
  }

  getFilesByQuery$(searchQuery): Observable<Reference[]> {
    return this.getFiles$().pipe(
      map((file) => file.filter((file) => file.name.includes(searchQuery)))
    );
  }

  uploadFile$(file): Observable<FullMetadata> {
    return from(
      firebase.storage()
        .ref()
        .child(`${this.authService.currentUserId()}/${file.name}`)
        .put(file)
        .then((a) => {
          return a;
        })
    );
  }

  uploadFiles$(files: File[]): Observable<FullMetadata[]> {
    return forkJoin(
      files.map((file) => this.uploadFile$(file))
    );
  }

}
