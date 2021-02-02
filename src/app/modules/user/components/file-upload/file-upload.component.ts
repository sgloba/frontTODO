import {Component, OnInit, ViewChild} from '@angular/core';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from '@angular/fire/storage';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import firebase from 'firebase/app';
import {map} from "rxjs/operators";

// TODO: autoupdate on uploading and first visit
// TODO: move uploading button to an external component and customize
// TODO: add toasts on success/error
// TODO: show progress indicator, disable button

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  task: AngularFireUploadTask;
  collection;
  userId;
  @ViewChild('fileInput') input;

  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore
  ) {

  }
  ngOnInit(): void {
    this.userId = firebase.auth().currentUser.uid;
  }

  show() {
    // TODO: create a service and move
    this.storage.ref(this.userId).listAll().subscribe( res => {
      this.collection = res.items;
    });
  }



  upload = () => {
    console.log(this.input.nativeElement.files[0]);
    // TODO: create a service and move
    const file = this.input.nativeElement.files[0];
    firebase.storage()
      .ref()
      .child(`${this.userId}/${file.name}`)
      .put(file);
  }
}
