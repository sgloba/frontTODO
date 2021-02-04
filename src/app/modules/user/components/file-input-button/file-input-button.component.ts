import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {FileStorageService} from '../../services/file-storage.service';
import {ToastrService} from 'ngx-toastr';
import {map} from 'rxjs/operators';

// TODO: allow to set custom button via ng-content


@Component({
  selector: 'app-file-input-button',
  templateUrl: './file-input-button.component.html',
  styleUrls: ['./file-input-button.component.scss']
})
export class FileInputButtonComponent {
  @Input() showToast = true;
  @Input() acceptedFileTypes: string[] = ['.jpeg', '.png', '.gif', '.txt', '.jpg'];
  @Input() multiple = true;
  @Output()
  uploadSuccess: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('fileInput') input;

  constructor(
    private fileStorage: FileStorageService,
    private toast: ToastrService,
  ) {
  }

  selectedFiles: File[] = [];

  setSelectedFiles(): void {
    this.selectedFiles = Array.from(this.input.nativeElement.files);
  }
  reset():void{
    this.selectedFiles = [];
    this.input.nativeElement.value = '';
  }
  upload():void  {
    const files = this.input.nativeElement.files;
    this.fileStorage.uploadFiles$([...files])
      .subscribe((res) => {
        if (this.showToast) {
          const fileNames = res.map(file => file.name).join(', ');
          this.toast.success(`${fileNames} uploaded`);
        }
        this.uploadSuccess.emit();
      });
    this.reset();
  }
}
