import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FileStorageService} from '../../services/file-storage.service';
import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-file-input-button',
  templateUrl: './file-input-button.component.html',
  styleUrls: ['./file-input-button.component.scss']
})
export class FileInputButtonComponent {
  @Input() showToast = true;
  @Output()
  uploadSuccess: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('fileInput') input;
  constructor(
    private fileStorage: FileStorageService,
    private toast: ToastrService,
  ) { }

  upload = () => {
    const file = this.input.nativeElement.files[0];
    this.fileStorage.uploadFiles(file).subscribe(() => {
      this.uploadSuccess.emit();
      if(this.showToast) {
        this.toast.success('file uploaded');
      }
    });
  }
}
