import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FileStorageService} from '../../services/file-storage.service';
import {Observable} from 'rxjs';
import {Reference} from '@angular/fire/storage/interfaces';
import {FileService} from '../../services/file.service';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileUploadComponent {
  collection$: Observable<Reference[]> = this.fileStorage.getFiles$()
  // TODO: Implement viewing images
  constructor(
    private fileStorage: FileStorageService,
    private fileService: FileService,
  ) { }
  viewFile(filename) :void {
    this.fileStorage.getDownloadUrl$(filename).subscribe(url => window.open(url));
  }
  updateFilesList(): void {
    this.collection$ = this.fileStorage.getFiles$();
  }
  getIcon(file): string {
    return this.fileService.getIcon(file);
  }
}
