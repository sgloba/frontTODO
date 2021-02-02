import {Component} from '@angular/core';
import {FileStorageService} from '../../services/file-storage.service';
import {Observable} from 'rxjs';
import {Reference} from '@angular/fire/storage/interfaces';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  collection$: Observable<Reference[]> = this.fileStorage.getFiles$();

  constructor(
    private fileStorage: FileStorageService,
  ) {}

  updateFilesList(): void {
    this.collection$ = this.fileStorage.getFiles$();
  }

}
