import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FileStorageService} from '../../services/file-storage.service';
import {Observable} from 'rxjs';
import {FileService} from '../../services/file.service';
import {Store} from '@ngrx/store';
import {allFiles} from '../../../../store/selectors/files.selectors';
import {fetchFilesStart} from '../../../../store/actions/files.actions';
import {FilesI} from '../../models/app.files.model';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileUploadComponent implements OnInit{
  collection$: Observable<FilesI[]> = this.store.select(allFiles);
  constructor(
    private fileStorage: FileStorageService,
    private fileService: FileService,
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(fetchFilesStart());
  }

  viewFile(filename) :void {
    this.fileStorage.getDownloadUrl$(filename).subscribe(url => window.open(url));
  }
  updateFilesList(): void {
    this.store.dispatch(fetchFilesStart());
  }
  getIcon(file): string {
    return this.fileService.getIcon(file);
  }

  upload(files): void {
    this.fileStorage.uploadFiles$([...files])
      .subscribe((res) => {
        this.updateFilesList();
      });
  }
}
