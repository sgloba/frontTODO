import {Component, EventEmitter, forwardRef, Input, Output, TemplateRef, ViewChild} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";


@Component({
  selector: 'app-file-input-button',
  templateUrl: './file-input-button.component.html',
  styleUrls: ['./file-input-button.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FileInputButtonComponent),
    multi: true
  }]
})
export class FileInputButtonComponent implements ControlValueAccessor {
  @Input() showToast = true;
  @Input() acceptedFileTypes: string[] = ['.jpeg', '.png', '.gif', '.txt', '.jpg'];
  @Input() multiple = true;
  @Input() showImgThmbl = false;
  @Input() showResetBtn = true;
  @Input() showUploadBtn = true;

  @Input()
  toastTrigger(files): void {
    if (this.showToast) {
      const fileNames = files.map(file => {
        // @ts-ignore
        return file.metadata.name;
      }).join(', ');
      this.toast.success(`${fileNames} uploaded`);
    }
  }

  @Output()
  uploadStart: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  uploadSuccess: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('fileInput') input;

  constructor(
    private toast: ToastrService
  ) {
  }

  onChange: any = () => {
  }
  onTouch: any = () => {
  }

  writeValue(value: any): void {
    if (!value || Array.isArray(value) && !value.length) {
      this.reset();
      return;
    }
    this.showImage();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  selectedFiles: File[] = [];
  imgThmblSrc: string | ArrayBuffer = '';
  files: any;

  setSelectedFiles(): void {

    this.selectedFiles = Array.from(this.input.nativeElement.files);
    if (this.showImgThmbl) {
      this.showImage();
    }
    this.onTouch(this.selectedFiles);
    this.onChange(this.selectedFiles);
  }

  reset(): void {
    this.selectedFiles = [];
    // this.input.nativeElement.value = '';
    this.imgThmblSrc = '';
  }

  showImage(): void {
    const fr = new FileReader();
    fr.readAsDataURL(this.selectedFiles[0]);
    fr.onload = () => this.imgThmblSrc = fr.result;
  }


  upload(event): void {
    event.preventDefault();
    const files = this.input.nativeElement.files;
    this.uploadStart.emit(files);
  }
}
